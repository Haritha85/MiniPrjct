import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration131706778379842 implements MigrationInterface {
    name = 'Migration131706778379842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "Project.dbo.product.package", "packagename"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "packagename"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "packagename" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "packagename"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "packagename" nvarchar(255) NOT NULL`);
        await queryRunner.query(`EXEC sp_rename "Project.dbo.product.packagename", "package"`);
    }

}
