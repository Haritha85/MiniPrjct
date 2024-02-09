import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration101706607776960 implements MigrationInterface {
    name = 'Migration101706607776960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_655874e74a3c984242b21113872"`);
        await queryRunner.query(`DROP INDEX "REL_655874e74a3c984242b2111387" ON "customer"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "custinfoId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "custinfoId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_655874e74a3c984242b2111387" ON "customer" ("custinfoId") WHERE ([custinfoId] IS NOT NULL)`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_655874e74a3c984242b21113872" FOREIGN KEY ("custinfoId") REFERENCES "custinfo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
