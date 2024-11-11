/*
  Warnings:

  - Added the required column `private` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "private" BOOLEAN NOT NULL;
