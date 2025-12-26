/*
  Warnings:

  - You are about to drop the column `id_location` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address_name` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_id` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_id_location_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "id_location",
ADD COLUMN     "address_name" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "place_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Location";
