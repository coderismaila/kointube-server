-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_userid_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_videoid_fkey";

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_videoid_fkey" FOREIGN KEY ("videoid") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
