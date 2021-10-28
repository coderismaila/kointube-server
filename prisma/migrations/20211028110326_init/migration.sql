-- AlterTable
ALTER TABLE "User" ADD COLUMN     "channel_name" TEXT,
ADD COLUMN     "cover_img" TEXT NOT NULL DEFAULT E'/channellogo.jpg',
ADD COLUMN     "profile_img" TEXT NOT NULL DEFAULT E'/channellogo.jpg';

-- CreateTable
CREATE TABLE "Subscribe" (
    "id" TEXT NOT NULL,
    "authorid" TEXT NOT NULL,
    "subscriberid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscribe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_subscriberid_fkey" FOREIGN KEY ("subscriberid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
