/*
  Warnings:

  - You are about to drop the `_follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_follow" DROP CONSTRAINT "_follow_A_fkey";

-- DropForeignKey
ALTER TABLE "_follow" DROP CONSTRAINT "_follow_B_fkey";

-- DropTable
DROP TABLE "_follow";

-- CreateTable
CREATE TABLE "_followUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_followUser_AB_unique" ON "_followUser"("A", "B");

-- CreateIndex
CREATE INDEX "_followUser_B_index" ON "_followUser"("B");

-- AddForeignKey
ALTER TABLE "_followUser" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
