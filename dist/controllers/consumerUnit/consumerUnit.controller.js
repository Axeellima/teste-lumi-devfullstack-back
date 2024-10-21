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
exports.getConsumerUnitsWithBillsController = void 0;
const getConsumerUnitsWithBills_service_1 = __importDefault(require("../../services/consumerUnit/getConsumerUnitsWithBills.service"));
const appError_1 = require("../../errors/appError");
const consumerUnitCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201).send();
    return;
});
const getConsumerUnitsWithBillsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, clientNumber } = req.query;
    let yearSearchNumber = Number(year);
    let clientSearchNumber = Number(clientNumber);
    if (!year) {
        throw new appError_1.AppError("Ano é obrigatório", 400);
    }
    if (isNaN(yearSearchNumber) ||
        (clientSearchNumber && isNaN(clientSearchNumber))) {
        throw new appError_1.AppError("Dados de pesquisa inválidos", 400);
    }
    let allConsumerUnitsWithBills = yield (0, getConsumerUnitsWithBills_service_1.default)({
        year: yearSearchNumber,
        clientNumber: clientSearchNumber,
    });
    res.status(200).send(allConsumerUnitsWithBills);
    return;
});
exports.getConsumerUnitsWithBillsController = getConsumerUnitsWithBillsController;
