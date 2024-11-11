/*
  Warnings:

  - You are about to drop the column `private` on the `Project` table. All the data in the column will be lost.
  - Added the required column `private_repo` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "private",
ADD COLUMN     "private_repo" BOOLEAN NOT NULL;
