-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "event" ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'PENDING';
