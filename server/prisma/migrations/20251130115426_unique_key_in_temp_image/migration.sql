/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `tempImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tempImage_key_key" ON "tempImage"("key");
