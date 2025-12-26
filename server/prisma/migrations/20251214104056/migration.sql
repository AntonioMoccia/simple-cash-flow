/*
  Warnings:

  - The values [PENDING,APPROVED,REJECTED,DELETED] on the enum `EventStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- AlterEnum
BEGIN;
CREATE TYPE "EventStatus_new" AS ENUM ('pending', 'approved', 'rejected', 'deleted');
ALTER TABLE "public"."event" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "event" ALTER COLUMN "status" TYPE "EventStatus_new" USING ("status"::text::"EventStatus_new");
ALTER TYPE "EventStatus" RENAME TO "EventStatus_old";
ALTER TYPE "EventStatus_new" RENAME TO "EventStatus";
DROP TYPE "public"."EventStatus_old";
ALTER TABLE "event" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "event" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" DEFAULT 'user';
