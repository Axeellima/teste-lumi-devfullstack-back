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
exports.CreateTables1729457216553 = void 0;
class CreateTables1729457216553 {
    constructor() {
        this.name = 'CreateTables1729457216553';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "bill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "referenceMonth" integer NOT NULL, "referenceYear" integer NOT NULL, "dueDate" date NOT NULL, "modality" character varying(20) NOT NULL, "distributor" character varying(20), "fileName" character varying NOT NULL, "consumptionEE" integer NOT NULL, "consumptionSCEE" integer NOT NULL, "compensatoryValueGDI" integer NOT NULL, "publicContribuition" integer NOT NULL, "consumptionTotal" integer NOT NULL, "value" integer NOT NULL, "valueWithoutCompensatoryValue" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "consumerId" uuid, CONSTRAINT "UQ_4de7e41a3f3bfd2bcd930af9150" UNIQUE ("fileName"), CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "consumerUnit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150), "number" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "distributor" character varying(100), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_181ce62adf1c0254ae2c207f9dd" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_1bb93752debfc720f73da073a34" FOREIGN KEY ("consumerId") REFERENCES "consumerUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_1bb93752debfc720f73da073a34"`);
            yield queryRunner.query(`DROP TABLE "consumerUnit"`);
            yield queryRunner.query(`DROP TABLE "bill"`);
        });
    }
}
exports.CreateTables1729457216553 = CreateTables1729457216553;
