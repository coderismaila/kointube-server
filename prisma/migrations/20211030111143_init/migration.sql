/*
  Warnings:

  - You are about to drop the column `viedoid` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `videoid` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_viedoid_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "viedoid",
ADD COLUMN     "videoid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_videoid_fkey" FOREIGN KEY ("videoid") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
