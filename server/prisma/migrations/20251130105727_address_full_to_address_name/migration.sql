/*
  Warnings:

  - You are about to drop the column `address_name` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `place_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `addressFull` on the `event_location` table. All the data in the column will be lost.
  - Added the required column `address_name` to the `event_location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "address_name",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "place_id";

-- AlterTable
ALTER TABLE "event_location" DROP COLUMN "addressFull",
ADD COLUMN     "address_name" TEXT NOT NULL;
