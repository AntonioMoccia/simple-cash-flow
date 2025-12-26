/*
  Warnings:

  - You are about to drop the column `data_start` on the `Event` table. All the data in the column will be lost.
  - Added the required column `date_start` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "data_start",
ADD COLUMN     "date_start" TIMESTAMP(3) NOT NULL;
