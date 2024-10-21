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
const appError_1 = require("../../errors/appError");
const createConsumerUnitService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, number, distributor, }) {
    const consumerAlreadyExists = yield repositores_1.consumerUnitsRepository.findOne({
        where: { number: number },
    });
    if (consumerAlreadyExists) {
        throw new appError_1.AppError("Unidade consumidora já existe", 401);
    }
    const newConsumerUnit = repositores_1.consumerUnitsRepository.create({
        name,
        number,
        distributor,
    });
    yield repositores_1.consumerUnitsRepository.save(newConsumerUnit);
    return newConsumerUnit;
});
exports.default = createConsumerUnitService;
