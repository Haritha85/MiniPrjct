import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration121706705731725 implements MigrationInterface {
    name = 'Migration121706705731725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_39db5324a2b0834d6b4585c872b"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_39db5324a2b0834d6b4585c872b" FOREIGN KEY ("customerCustomerId") REFERENCES "customer"("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_39db5324a2b0834d6b4585c872b"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_39db5324a2b0834d6b4585c872b" FOREIGN KEY ("customerCustomerId") REFERENCES "customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
