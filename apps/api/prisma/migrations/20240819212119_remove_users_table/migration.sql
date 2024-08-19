/*
  Warnings:

  - You are about to drop the column `userId` on the `chat_sessions` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat_sessions" DROP CONSTRAINT "chat_sessions_userId_fkey";

-- DropIndex
DROP INDEX "chat_sessions_agentId_userId_idx";

-- AlterTable
ALTER TABLE "chat_sessions" DROP COLUMN "userId";

-- DropTable
DROP TABLE "User";
