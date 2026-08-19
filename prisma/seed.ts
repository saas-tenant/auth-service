import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
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
