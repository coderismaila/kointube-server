-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "videoid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_videoid_fkey" FOREIGN KEY ("videoid") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
