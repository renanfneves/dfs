/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sub_topics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `topics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `chat_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat_sessions" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sub_topics_name_key" ON "sub_topics"("name");

-- CreateIndex
CREATE UNIQUE INDEX "topics_name_key" ON "topics"("name");

-- AddForeignKey
ALTER TABLE "chat_sessions" ADD CONSTRAINT "chat_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
