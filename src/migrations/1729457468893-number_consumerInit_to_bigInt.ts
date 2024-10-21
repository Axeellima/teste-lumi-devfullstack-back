import { MigrationInterface, QueryRunner } from "typeorm";

export class NumberConsumerInitToBigInt1729457468893 implements MigrationInterface {
    name = 'NumberConsumerInitToBigInt1729457468893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumerUnit" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "consumerUnit" ADD "number" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumerUnit" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "consumerUnit" ADD "number" integer NOT NULL`);
    }

}
