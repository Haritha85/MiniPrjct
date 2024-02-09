import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11706529649515 implements MigrationInterface {
    name = 'Migration11706529649515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("customer_id" int NOT NULL IDENTITY(1,1), "firstName" nvarchar(255) NOT NULL, "lastName" nvarchar(255) NOT NULL, "city" nvarchar(255) NOT NULL, "country" nvarchar(255) NOT NULL, "phone" int NOT NULL, CONSTRAINT "PK_cde3d123fc6077bcd75eb051226" PRIMARY KEY ("customer_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
