/*
  Warnings:

  - You are about to drop the column `name` on the `topics` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "topics_name_key";

-- AlterTable
ALTER TABLE "topics" DROP COLUMN "name";
