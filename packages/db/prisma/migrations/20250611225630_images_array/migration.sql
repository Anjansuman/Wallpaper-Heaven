/*
  Warnings:

  - You are about to drop the column `image1` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image3` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image1",
DROP COLUMN "image2",
DROP COLUMN "image3",
ADD COLUMN     "images" TEXT[];
