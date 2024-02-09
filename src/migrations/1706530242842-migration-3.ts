import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration31706530242842 implements MigrationInterface {
    name = 'Migration31706530242842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_item" ("orderItem_id" int NOT NULL IDENTITY(1,1), "quantity" int NOT NULL, "unitPrice" int NOT NULL, "orderOrderId" int, CONSTRAINT "PK_18bfd130310ef83a457faeca288" PRIMARY KEY ("orderItem_id"))`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_2b190f3c372c5100451c767a707" FOREIGN KEY ("orderOrderId") REFERENCES "order"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_2b190f3c372c5100451c767a707"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
    }

}
