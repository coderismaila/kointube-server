/*
  Warnings:

  - Added the required column `channelid` to the `View` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dislike" DROP CONSTRAINT "Dislike_userid_fkey";

-- DropForeignKey
ALTER TABLE "Dislike" DROP CONSTRAINT "Dislike_videoid_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userid_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_videoid_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_authorid_fkey";

-- AlterTable
ALTER TABLE "View" ADD COLUMN     "channelid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_videoid_fkey" FOREIGN KEY ("videoid") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_videoid_fkey" FOREIGN KEY ("videoid") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_channelid_fkey" FOREIGN KEY ("channelid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
