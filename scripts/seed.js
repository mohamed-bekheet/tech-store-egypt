const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);
  
  // 1. Admin Account
  const admin = await prisma.user.upsert({
    where: { email: 'admin@voltegypt.com' },
    update: {
      password: adminPassword,
      role: 'ADMIN',
    },
    create: {
      email: 'admin@voltegypt.com',
      name: 'Volt Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // 2. Normal User Account
  const normalUser = await prisma.user.upsert({
    where: { email: 'user@voltegypt.com' },
    update: {
      password: userPassword,
      role: 'USER',
    },
    create: {
      email: 'user@voltegypt.com',
      name: 'Ahmed Mohamed',
      password: userPassword,
      role: 'USER',
    },
  });

  // 3. Sample Products
  const sampleProducts = [
    {
      name: 'Volt HyperStrike Gaming Keyboard',
      description: 'Ultra-low latency mechanical RGB keyboard with optical switches.',
      price: 2499,
      category: 'Peripherals',
      isFeatured: true,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Volt Wireless Pro Gaming Mouse',
      description: '26K DPI sensor, 54g lightweight design with ultra-fast wireless tech.',
      price: 1850,
      category: 'Peripherals',
      isFeatured: true,
      imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Volt Apex 27" QHD 240Hz Monitor',
      description: 'Fast IPS panel with 1ms response time and HDR600 display.',
      price: 11999,
      category: 'Displays',
      isFeatured: true,
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Volt Spatial Audio Pro Headset',
      description: '7.1 Surround sound with noise-cancelling broadcast-grade microphone.',
      price: 3200,
      category: 'Audio',
      isFeatured: false,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    }
  ];

  for (const item of sampleProducts) {
    const existing = await prisma.product.findFirst({ where: { name: item.name } });
    if (!existing) {
      await prisma.product.create({ data: item });
    }
  }

  console.log('✅ Accounts & Products seeded successfully:');
  console.log(' - Admin:', admin.email, '(Role: ADMIN)');
  console.log(' - User:', normalUser.email, '(Role: USER)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
