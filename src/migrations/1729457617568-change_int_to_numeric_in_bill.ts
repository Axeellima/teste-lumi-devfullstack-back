import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIntToNumericInBill1729457617568 implements MigrationInterface {
    name = 'ChangeIntToNumericInBill1729457617568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "publicContribuition"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "publicContribuition" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "consumptionTotal"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "consumptionTotal" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "value" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "consumptionTotal"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "consumptionTotal" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "publicContribuition"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "publicContribuition" integer NOT NULL`);
    }

}
