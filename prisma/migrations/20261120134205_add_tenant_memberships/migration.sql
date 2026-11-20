
-- 1. Create the membership role enum
CREATE TYPE "RoleType" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- 2. Create the new membership table
CREATE TABLE "TenantMembership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "role" "RoleType" NOT NULL DEFAULT 'MEMBER',
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantMembership_pkey" PRIMARY KEY ("id")
);

-- 3. Preserve all existing user-tenant relationships and statuses
INSERT INTO "TenantMembership" (
    "id",
    "userId",
    "tenantId",
    "role",
    "status",
    "createdAt",
    "updatedAt"
)
SELECT
    gen_random_uuid()::TEXT,
    "id",
    "tenantId",
    'MEMBER'::"RoleType",
    "status",
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "User";

-- 4. Create indexes
CREATE INDEX "TenantMembership_tenantId_idx"
ON "TenantMembership"("tenantId");

CREATE UNIQUE INDEX "TenantMembership_userId_tenantId_key"
ON "TenantMembership"("userId", "tenantId");

-- 5. Add foreign keys
ALTER TABLE "TenantMembership"
ADD CONSTRAINT "TenantMembership_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TenantMembership"
ADD CONSTRAINT "TenantMembership_tenantId_fkey"
FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- 6. Remove the old User -> Tenant relationship
ALTER TABLE "User" DROP CONSTRAINT "User_tenantId_fkey";

DROP INDEX "User_tenantId_email_key";
DROP INDEX "User_tenantId_idx";

ALTER TABLE "User"
DROP COLUMN "status",
DROP COLUMN "tenantId";
