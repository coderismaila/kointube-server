/*
  Warnings:

  - You are about to drop the `_VideoToView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_VideoToView" DROP CONSTRAINT "_VideoToView_A_fkey";

-- DropForeignKey
ALTER TABLE "_VideoToView" DROP CONSTRAINT "_VideoToView_B_fkey";

-- DropForeignKey
ALTER TABLE "_channel" DROP CONSTRAINT "_channel_A_fkey";

-- DropForeignKey
ALTER TABLE "_channel" DROP CONSTRAINT "_channel_B_fkey";

-- DropForeignKey
ALTER TABLE "_user" DROP CONSTRAINT "_user_A_fkey";

-- DropForeignKey
ALTER TABLE "_user" DROP CONSTRAINT "_user_B_fkey";

-- DropTable
DROP TABLE "_VideoToView";

-- DropTable
DROP TABLE "_channel";

-- DropTable
DROP TABLE "_user";
