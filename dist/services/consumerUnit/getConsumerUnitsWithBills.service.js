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
const getConsumerUnitsWithBillsService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ year, clientNumber, }) {
    const queryConditions = {
        where: {
            bills: {
                referenceYear: year,
            },
        },
        relations: ["bills"],
    };
    const consumerUnits = yield repositores_1.consumerUnitsRepository.find(queryConditions);
    if (clientNumber && consumerUnits) {
        const filteredConsumerUnits = consumerUnits.filter((c) => c.number.toString().includes(clientNumber.toString()));
        if (!filteredConsumerUnits) {
            return [];
        }
        return filteredConsumerUnits;
    }
    return consumerUnits;
});
exports.default = getConsumerUnitsWithBillsService;
