-- CreateTable
CREATE TABLE "_user" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_channel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VideoToView" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_AB_unique" ON "_user"("A", "B");

-- CreateIndex
CREATE INDEX "_user_B_index" ON "_user"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_channel_AB_unique" ON "_channel"("A", "B");

-- CreateIndex
CREATE INDEX "_channel_B_index" ON "_channel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VideoToView_AB_unique" ON "_VideoToView"("A", "B");

-- CreateIndex
CREATE INDEX "_VideoToView_B_index" ON "_VideoToView"("B");

-- AddForeignKey
ALTER TABLE "_user" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user" ADD FOREIGN KEY ("B") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_channel" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_channel" ADD FOREIGN KEY ("B") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoToView" ADD FOREIGN KEY ("A") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoToView" ADD FOREIGN KEY ("B") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;
