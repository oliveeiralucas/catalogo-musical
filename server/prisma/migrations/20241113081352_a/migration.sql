/*
  Warnings:

  - You are about to drop the column `cover` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Album` table. All the data in the column will be lost.
  - Added the required column `coverImage` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseYear` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "cover",
DROP COLUMN "year",
ADD COLUMN     "coverImage" TEXT NOT NULL,
ADD COLUMN     "releaseYear" INTEGER NOT NULL;
