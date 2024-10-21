"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyFinancialResults = exports.downloadBillPDFController = exports.extractAndCreateBillsController = exports.listBillsController = exports.createBillController = void 0;
const createBill_service_1 = __importDefault(require("../../services/bill/createBill.service"));
const repositores_1 = require("../../utils/repositores");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const appError_1 = require("../../errors/appError");
const readBills_1 = require("../../utils/readBills");
const uuid_1 = require("uuid");
const createBillController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const createdBill = (0, createBill_service_1.default)(Object.assign({}, data));
    res.status(201).send(createdBill);
    return;
});
exports.createBillController = createBillController;
const downloadBillPDFController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let isValid = (0, uuid_1.validate)(id);
    if (!isValid) {
        throw new appError_1.AppError("O ID da Fatura é inválido", 400);
    }
    if (!id) {
        throw new appError_1.AppError("O ID da Fatura é obrigatório", 400);
    }
    const bill = yield repositores_1.billsRepository.findOne({ where: { id: id } });
    if (!bill) {
        throw new appError_1.AppError("Fatura não encontrada", 404);
    }
    const filePath = path_1.default.join(__dirname, "../../template/bills", bill.fileName);
    if (!fs_1.default.existsSync(filePath)) {
        throw new appError_1.AppError("Arquivo PDF não encontrado", 404);
    }
    res.download(filePath, bill.fileName);
    return;
});
exports.downloadBillPDFController = downloadBillPDFController;
const listBillsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bills = yield repositores_1.billsRepository.find({
        relations: ["consumer"],
    });
    res.json(bills);
    return;
});
exports.listBillsController = listBillsController;
const extractAndCreateBillsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const billsDirectory = "./src/template/bills";
    if (!fs_1.default.existsSync(billsDirectory)) {
        throw new appError_1.AppError("Diretório de PDFs não encontrado", 404);
    }
    const files = fs_1.default
        .readdirSync(billsDirectory)
        .filter((file) => file.endsWith(".pdf"));
    if (files.length === 0) {
        throw new appError_1.AppError("Nenhum arquivo PDF encontrado no diretório", 404);
    }
    for (const file of files) {
        const filePath = path_1.default.join(billsDirectory, file);
        try {
            // Chama sua função de extração de PDF
            const extractedData = yield (0, readBills_1.extractDataFromPDF)(filePath); // Supondo que você tenha uma função para isso
            // Cria a Bill usando os dados extraídos
            let month = parseInt(extractedData.dueDate.split("/")[1]);
            let year = parseInt(extractedData.dueDate.split("/")[2]);
            const billData = {
                consumer: extractedData.consumer,
                referenceMonth: month ? month : 1,
                referenceYear: year ? year : 1970,
                dueDate: new Date(extractedData.dueDate),
                modality: "Alguma modalidade",
                fileName: extractedData.fileName,
                consumptionEE: extractedData.consumptionEE,
                consumptionSCEE: extractedData.consumptionSCEE,
                compensatoryGDI: extractedData.compensatoryGDI,
                consumptionTotal: extractedData.consumptionTotal,
                compensatoryValueGDI: extractedData.compensatoryValueGDI,
                publicContribuition: extractedData.publicContribution,
                value: extractedData.totalValue,
                valueWithoutCompensatoryValue: extractedData.totalBeforeRefund,
                consumerName: extractedData.consumerName,
            };
            // Cria a Bill usando os dados extraídos
            yield (0, createBill_service_1.default)(billData);
        }
        catch (error) {
            throw new appError_1.AppError(`Erro ao processar o arquivo ${filePath}`, 500);
        }
    }
    res.status(200).json({ message: "Todas as bills cadastradas com sucesso." });
    return;
});
exports.extractAndCreateBillsController = extractAndCreateBillsController;
const getMonthlyFinancialResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const monthlyFinancialResults = yield repositores_1.billsRepository
        .createQueryBuilder("bill")
        .select("bill.referenceMonth", "month")
        .addSelect("SUM(bill.valueWithoutCompensatoryValue)", "totalValueBillsWithoutGDR")
        .addSelect("SUM(bill.compensatoryGDI)", "totalEconomyGDR")
        .addSelect("SUM(bill.consumptionTotal)", "consumptionTotal")
        .addSelect("SUM(bill.value)", "totalValueBills")
        .groupBy("bill.referenceMonth")
        .orderBy("bill.referenceMonth", "ASC")
        .getRawMany();
    const formattedResults = monthlyFinancialResults.map((result) => ({
        month: result.month,
        totalValueBills: parseFloat(result.totalValueBills) || 0,
        totalValueBillsWithoutGDR: parseFloat(result.totalValueBillsWithoutGDR) || 0,
        totalEconomyGDRConsume: result.totalEconomyGDR || 0,
        totalEEConsume: parseFloat(result.consumptionTotal) || 0,
    }));
    res.send(formattedResults);
    return;
});
exports.getMonthlyFinancialResults = getMonthlyFinancialResults;
