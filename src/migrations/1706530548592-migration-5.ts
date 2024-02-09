import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration51706530548592 implements MigrationInterface {
    name = 'Migration51706530548592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier" ("supplier_id" int NOT NULL IDENTITY(1,1), "companyName" nvarchar(255) NOT NULL, "contactName" nvarchar(255) NOT NULL, "city" nvarchar(255) NOT NULL, "country" nvarchar(255) NOT NULL, "phone" int NOT NULL, CONSTRAINT "PK_e0f8ee60663218082b83251cd85" PRIMARY KEY ("supplier_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "supplier"`);
    }

}
