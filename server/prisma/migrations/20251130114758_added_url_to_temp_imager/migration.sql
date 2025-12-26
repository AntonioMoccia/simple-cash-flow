/*
  Warnings:

  - Added the required column `url` to the `tempImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tempImage" ADD COLUMN     "url" TEXT NOT NULL;
