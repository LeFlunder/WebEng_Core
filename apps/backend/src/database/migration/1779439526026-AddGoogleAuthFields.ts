import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGoogleAuthFields1779439526026 implements MigrationInterface {
    name = 'AddGoogleAuthFields1779439526026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "provider" character varying NOT NULL DEFAULT 'local'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "picture" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "provider"`);
    }

}
