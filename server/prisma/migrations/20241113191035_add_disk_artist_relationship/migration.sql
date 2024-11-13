/*
  Warnings:

  - You are about to drop the column `genreId` on the `Album` table. All the data in the column will be lost.
  - Made the column `artistId` on table `Album` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_genreId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "genreId",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "artistId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Disk" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "coverImage" TEXT,
    "artistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AlbumGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumDisks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumGenres_AB_unique" ON "_AlbumGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumGenres_B_index" ON "_AlbumGenres"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumDisks_AB_unique" ON "_AlbumDisks"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumDisks_B_index" ON "_AlbumDisks"("B");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disk" ADD CONSTRAINT "Disk_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumGenres" ADD CONSTRAINT "_AlbumGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumGenres" ADD CONSTRAINT "_AlbumGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumDisks" ADD CONSTRAINT "_AlbumDisks_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumDisks" ADD CONSTRAINT "_AlbumDisks_B_fkey" FOREIGN KEY ("B") REFERENCES "Disk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
