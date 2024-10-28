/*
  Warnings:

  - You are about to drop the column `installationId` on the `AccessToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `AccessToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AccessToken_installationId_user_id_key";

-- AlterTable
ALTER TABLE "AccessToken" DROP COLUMN "installationId";

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_user_id_key" ON "AccessToken"("user_id");
