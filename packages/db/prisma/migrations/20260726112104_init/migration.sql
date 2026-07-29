-- DropIndex
DROP INDEX "Product_productTypeId_key";

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "rank" INTEGER;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "SiteSection" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "badge" TEXT,
    "title" TEXT,
    "subtitle" TEXT,
    "description" TEXT,
    "rootImage" TEXT,
    "images" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuery" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserQuery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteSection_key_key" ON "SiteSection"("key");
