import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration71706604161872 implements MigrationInterface {
    name = 'Migration71706604161872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "custinfo" ("id" int NOT NULL IDENTITY(1,1), "additionalinfo" nvarchar(255) NOT NULL, "customerCustomerId" int, CONSTRAINT "PK_2b5ffb4f36f08f3b30e5bef2a00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_953396c0707d053e12fb68e40b" ON "custinfo" ("customerCustomerId") WHERE "customerCustomerId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "custinfoId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_655874e74a3c984242b2111387" ON "customer" ("custinfoId") WHERE "custinfoId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "custinfo" ADD CONSTRAINT "FK_953396c0707d053e12fb68e40b6" FOREIGN KEY ("customerCustomerId") REFERENCES "customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_655874e74a3c984242b21113872" FOREIGN KEY ("custinfoId") REFERENCES "custinfo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_655874e74a3c984242b21113872"`);
        await queryRunner.query(`ALTER TABLE "custinfo" DROP CONSTRAINT "FK_953396c0707d053e12fb68e40b6"`);
        await queryRunner.query(`DROP INDEX "REL_655874e74a3c984242b2111387" ON "customer"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "custinfoId"`);
        await queryRunner.query(`DROP INDEX "REL_953396c0707d053e12fb68e40b" ON "custinfo"`);
        await queryRunner.query(`DROP TABLE "custinfo"`);
    }

}
