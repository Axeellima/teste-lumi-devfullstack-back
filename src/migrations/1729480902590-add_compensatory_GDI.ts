import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompensatoryGDI1729480902590 implements MigrationInterface {
    name = 'AddCompensatoryGDI1729480902590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" ADD "compensatoryGDI" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "compensatoryGDI"`);
    }

}
