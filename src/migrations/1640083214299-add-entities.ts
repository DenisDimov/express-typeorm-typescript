import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntities1640083214299 implements MigrationInterface {
  name = 'addEntities1640083214299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "catalog" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "type" text NOT NULL DEFAULT '[]', "price" integer NOT NULL, CONSTRAINT "PK_782754bded12b4e75ad4afff913" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "city" character varying NOT NULL, "address" character varying NOT NULL, "phone" numeric NOT NULL, "birthday" date NOT NULL, "role" text NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pizzeria" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "city" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_2bcdcbdc2333bfd646b05262bad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "summ" integer NOT NULL, "discount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "pizzeriaId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "pizzeria"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "catalog"`);
  }
}
