/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `tempImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tempImage_url_key" ON "tempImage"("url");
