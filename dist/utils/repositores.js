"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerUnitsRepository = exports.billsRepository = void 0;
const data_source_1 = __importDefault(require("../data-source"));
const bill_entity_1 = require("../entities/bill.entity");
const consumerUnit_entity_1 = require("../entities/consumerUnit.entity");
exports.billsRepository = data_source_1.default.getRepository(bill_entity_1.Bill);
exports.consumerUnitsRepository = data_source_1.default.getRepository(consumerUnit_entity_1.ConsumerUnit);
