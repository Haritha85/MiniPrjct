import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration91706606887482 implements MigrationInterface {
    name = 'Migration91706606887482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "Complted" bit NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "Complted"`);
    }

}
