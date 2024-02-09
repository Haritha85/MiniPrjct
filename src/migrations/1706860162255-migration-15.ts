import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration151706860162255 implements MigrationInterface {
    name = 'Migration151706860162255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9c8147145b290c8c4cfc64a9660"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9c8147145b290c8c4cfc64a9660" FOREIGN KEY ("supplierSupplierId") REFERENCES "supplier"("supplier_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9c8147145b290c8c4cfc64a9660"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9c8147145b290c8c4cfc64a9660" FOREIGN KEY ("supplierSupplierId") REFERENCES "supplier"("supplier_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
