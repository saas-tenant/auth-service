"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({
    adapter,
});
async function main() {
    const tenants = [
        {
            name: 'Ramand',
            slug: 'ramand',
            domain: 'ramand.local',
        },
        {
            name: 'Elegant',
            slug: 'elegant',
            domain: 'elegant.local',
        },
    ];
    for (const tenant of tenants) {
        await prisma.tenant.upsert({
            where: {
                domain: tenant.domain,
            },
            update: {
                name: tenant.name,
                slug: tenant.slug,
            },
            create: tenant,
        });
    }
    console.log('✅ Tenants seeded');
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map