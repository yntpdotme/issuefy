/*
  Warnings:

  - You are about to drop the column `userId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_userId_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
