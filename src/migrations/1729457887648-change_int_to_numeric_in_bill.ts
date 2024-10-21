import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIntToNumericInBill1729457887648 implements MigrationInterface {
    name = 'ChangeIntToNumericInBill1729457887648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "compensatoryValueGDI"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "compensatoryValueGDI" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "compensatoryValueGDI"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "compensatoryValueGDI" integer NOT NULL`);
    }

}
