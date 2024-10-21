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
Object.defineProperty(exports, "__esModule", { value: true });
const repositores_1 = require("../../utils/repositores");
const createBillService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ consumer, // Pode ser um número ou objeto de consumidor
referenceMonth, referenceYear, dueDate, modality, distributor, consumptionEE, consumptionSCEE, compensatoryValueGDI, publicContribuition, compensatoryGDI, consumptionTotal, fileName, value, valueWithoutCompensatoryValue, consumerName, }) {
    let consumerUnit;
    consumerUnit = yield repositores_1.consumerUnitsRepository.findOne({
        where: { number: consumer },
    });
    // Se o consumidor não existir, cria um novo
    if (!consumerUnit) {
        consumerUnit = repositores_1.consumerUnitsRepository.create({
            number: consumer,
            name: consumerName,
            distributor: distributor ? distributor : "Não encontrado",
        });
        yield repositores_1.consumerUnitsRepository.save(consumerUnit);
    }
    const existingBill = yield repositores_1.billsRepository.findOne({
        where: { fileName: fileName },
    });
    // Se a fatura já existe, ignorar e retornar uma mensagem
    if (existingBill) {
        return;
    }
    const newBill = repositores_1.billsRepository.create({
        referenceMonth: referenceMonth - 2,
        referenceYear,
        distributor,
        dueDate,
        consumptionEE,
        consumptionSCEE,
        fileName,
        compensatoryValueGDI,
        compensatoryGDI,
        consumptionTotal,
        consumer: consumerUnit,
        publicContribuition,
        valueWithoutCompensatoryValue,
        value,
        modality,
    });
    yield repositores_1.billsRepository.save(newBill);
    return newBill;
});
exports.default = createBillService;
