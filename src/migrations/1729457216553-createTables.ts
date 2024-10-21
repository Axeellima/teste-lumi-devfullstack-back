import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1729457216553 implements MigrationInterface {
    name = 'CreateTables1729457216553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "referenceMonth" integer NOT NULL, "referenceYear" integer NOT NULL, "dueDate" date NOT NULL, "modality" character varying(20) NOT NULL, "distributor" character varying(20), "fileName" character varying NOT NULL, "consumptionEE" integer NOT NULL, "consumptionSCEE" integer NOT NULL, "compensatoryValueGDI" integer NOT NULL, "publicContribuition" integer NOT NULL, "consumptionTotal" integer NOT NULL, "value" integer NOT NULL, "valueWithoutCompensatoryValue" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "consumerId" uuid, CONSTRAINT "UQ_4de7e41a3f3bfd2bcd930af9150" UNIQUE ("fileName"), CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consumerUnit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150), "number" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "distributor" character varying(100), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_181ce62adf1c0254ae2c207f9dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_1bb93752debfc720f73da073a34" FOREIGN KEY ("consumerId") REFERENCES "consumerUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_1bb93752debfc720f73da073a34"`);
        await queryRunner.query(`DROP TABLE "consumerUnit"`);
        await queryRunner.query(`DROP TABLE "bill"`);
    }

}
