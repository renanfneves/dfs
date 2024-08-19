/*
  Warnings:

  - Added the required column `email` to the `chat_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat_sessions" ADD COLUMN     "email" TEXT NOT NULL;
