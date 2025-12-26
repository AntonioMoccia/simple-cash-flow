/*
  Warnings:

  - You are about to drop the column `placeId` on the `event_location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event_location" DROP COLUMN "placeId",
ADD COLUMN     "place_id" TEXT;
