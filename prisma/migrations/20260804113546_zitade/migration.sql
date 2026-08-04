/*
  Warnings:

  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tenant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "Membership";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Tenant";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "RoleType";

-- DropEnum
DROP TYPE "TenantStatus";

-- DropEnum
DROP TYPE "UserStatus";
