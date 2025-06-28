-- CreateEnum
CREATE TYPE "Badge" AS ENUM ('Offer', 'New');

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "discount" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "validTill" TIMESTAMP(3) NOT NULL,
    "badge" "Badge" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addedById" TEXT NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
