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
exports.ChangeIntToNumericInBill1729457887648 = void 0;
class ChangeIntToNumericInBill1729457887648 {
    constructor() {
        this.name = 'ChangeIntToNumericInBill1729457887648';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "compensatoryValueGDI"`);
            yield queryRunner.query(`ALTER TABLE "bill" ADD "compensatoryValueGDI" numeric NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "compensatoryValueGDI"`);
            yield queryRunner.query(`ALTER TABLE "bill" ADD "compensatoryValueGDI" integer NOT NULL`);
        });
    }
}
exports.ChangeIntToNumericInBill1729457887648 = ChangeIntToNumericInBill1729457887648;
