import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration81706604626989 implements MigrationInterface {
    name = 'Migration81706604626989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_suppliers_supplier" ("customerCustomerId" int NOT NULL, "supplierSupplierId" int NOT NULL, CONSTRAINT "PK_217c577232b1518f2b6ae7a3c86" PRIMARY KEY ("customerCustomerId", "supplierSupplierId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0030e6d29cb983391cac6d26a2" ON "customer_suppliers_supplier" ("customerCustomerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9aee0f5f3561c76c38fc24f384" ON "customer_suppliers_supplier" ("supplierSupplierId") `);
        await queryRunner.query(`CREATE TABLE "supplier_customers_customer" ("supplierSupplierId" int NOT NULL, "customerCustomerId" int NOT NULL, CONSTRAINT "PK_65842d909fd3daf468ebf7a8fd8" PRIMARY KEY ("supplierSupplierId", "customerCustomerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_923b9558c1901de1e87bb771bc" ON "supplier_customers_customer" ("supplierSupplierId") `);
        await queryRunner.query(`CREATE INDEX "IDX_84bc882688918a284e6cd7d9aa" ON "supplier_customers_customer" ("customerCustomerId") `);
        await queryRunner.query(`ALTER TABLE "customer_suppliers_supplier" ADD CONSTRAINT "FK_0030e6d29cb983391cac6d26a2e" FOREIGN KEY ("customerCustomerId") REFERENCES "customer"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "customer_suppliers_supplier" ADD CONSTRAINT "FK_9aee0f5f3561c76c38fc24f3844" FOREIGN KEY ("supplierSupplierId") REFERENCES "supplier"("supplier_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier_customers_customer" ADD CONSTRAINT "FK_923b9558c1901de1e87bb771bc2" FOREIGN KEY ("supplierSupplierId") REFERENCES "supplier"("supplier_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supplier_customers_customer" ADD CONSTRAINT "FK_84bc882688918a284e6cd7d9aac" FOREIGN KEY ("customerCustomerId") REFERENCES "customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_customers_customer" DROP CONSTRAINT "FK_84bc882688918a284e6cd7d9aac"`);
        await queryRunner.query(`ALTER TABLE "supplier_customers_customer" DROP CONSTRAINT "FK_923b9558c1901de1e87bb771bc2"`);
        await queryRunner.query(`ALTER TABLE "customer_suppliers_supplier" DROP CONSTRAINT "FK_9aee0f5f3561c76c38fc24f3844"`);
        await queryRunner.query(`ALTER TABLE "customer_suppliers_supplier" DROP CONSTRAINT "FK_0030e6d29cb983391cac6d26a2e"`);
        await queryRunner.query(`DROP INDEX "IDX_84bc882688918a284e6cd7d9aa" ON "supplier_customers_customer"`);
        await queryRunner.query(`DROP INDEX "IDX_923b9558c1901de1e87bb771bc" ON "supplier_customers_customer"`);
        await queryRunner.query(`DROP TABLE "supplier_customers_customer"`);
        await queryRunner.query(`DROP INDEX "IDX_9aee0f5f3561c76c38fc24f384" ON "customer_suppliers_supplier"`);
        await queryRunner.query(`DROP INDEX "IDX_0030e6d29cb983391cac6d26a2" ON "customer_suppliers_supplier"`);
        await queryRunner.query(`DROP TABLE "customer_suppliers_supplier"`);
    }

}
