import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration21706530069850 implements MigrationInterface {
    name = 'Migration21706530069850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("order_id" int NOT NULL IDENTITY(1,1), "orderDate" datetime NOT NULL, "totalAmount" int NOT NULL, "customerCustomerId" int, CONSTRAINT "PK_58998c5eaeaacdd004dec8b5d86" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_39db5324a2b0834d6b4585c872b" FOREIGN KEY ("customerCustomerId") REFERENCES "customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_39db5324a2b0834d6b4585c872b"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
