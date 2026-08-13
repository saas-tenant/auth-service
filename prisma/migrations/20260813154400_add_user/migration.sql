/*
  Warnings:

  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zitadelId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[zitadelUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `zitadelUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_zitadelId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
DROP COLUMN "zitadelId",
ADD COLUMN     "zitadelUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_zitadelUserId_key" ON "User"("zitadelUserId");
