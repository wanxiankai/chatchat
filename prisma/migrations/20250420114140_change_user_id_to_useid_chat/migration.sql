/*
  Warnings:

  - You are about to drop the column `userId` on the `chats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chats" DROP COLUMN "userId",
ADD COLUMN     "userid" TEXT;
