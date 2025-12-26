/*
  Warnings:

  - You are about to drop the column `date_end` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `date_start` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `time_end` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `time_start` on the `Event` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date_end",
DROP COLUMN "date_start",
DROP COLUMN "time_end",
DROP COLUMN "time_start",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
