/*
  Warnings:

  - You are about to drop the `TempImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TempImage";

-- CreateTable
CREATE TABLE "tempImage" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tempImage_pkey" PRIMARY KEY ("id")
);
