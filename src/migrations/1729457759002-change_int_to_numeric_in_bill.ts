import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIntToNumericInBill1729457759002 implements MigrationInterface {
    name = 'ChangeIntToNumericInBill1729457759002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "valueWithoutCompensatoryValue"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "valueWithoutCompensatoryValue" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "valueWithoutCompensatoryValue"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "valueWithoutCompensatoryValue" integer NOT NULL`);
    }

}
