import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration161707130273651 implements MigrationInterface {
    name = 'Migration161707130273651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_2b190f3c372c5100451c767a707"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_2b190f3c372c5100451c767a707" FOREIGN KEY ("orderOrderId") REFERENCES "order"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_2b190f3c372c5100451c767a707"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_2b190f3c372c5100451c767a707" FOREIGN KEY ("orderOrderId") REFERENCES "order"("order_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
