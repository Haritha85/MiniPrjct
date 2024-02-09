import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration111706611523595 implements MigrationInterface {
    name = 'Migration111706611523595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "phone" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "phone" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "phone" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "phone" int NOT NULL`);
    }

}
