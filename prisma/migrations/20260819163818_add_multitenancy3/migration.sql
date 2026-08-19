/*
  Warnings:

  - A unique constraint covering the columns `[zitadelUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zitadelUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "zitadelUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_zitadelUserId_key" ON "User"("zitadelUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
