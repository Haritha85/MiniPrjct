import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration41706530428632 implements MigrationInterface {
    name = 'Migration41706530428632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("product_id" int NOT NULL IDENTITY(1,1), "productName" nvarchar(255) NOT NULL, "unitPrice" int NOT NULL, "package" nvarchar(255) NOT NULL, "isDiscontinued" bit NOT NULL, CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "productProductId" int`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_ccd2fd288ac4e0ee2d34e1eb733" FOREIGN KEY ("productProductId") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_ccd2fd288ac4e0ee2d34e1eb733"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productProductId"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
