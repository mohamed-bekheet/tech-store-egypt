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

  // Clear existing products to sync perfectly with the real data
  await prisma.product.deleteMany({});

  // 3. Real Authentic Products
  const sampleProducts = [
    {
      name: 'Bambu Lab X1-Carbon Combo',
      description: 'Flagship High-Speed Multi-Color 3D Printer. Equipped with AI lidar, dual auto bed leveling, and the AMS for up to 16 colors.',
      price: 59999,
      category: '3D Printers',
      isFeatured: true,
      imageUrl: 'https://ardubotics.eu/14509-large/bambu-lab-x1-carbon.jpg',
    },
    {
      name: 'Bambu Lab P1S Combo',
      description: 'Enclosed CoreXY 3D printer with 500mm/s print speed. Includes AMS for multi-color printing straight out of the box.',
      price: 34999,
      category: '3D Printers',
      isFeatured: false,
      imageUrl: 'https://store.bblcdn.eu/s8/default/1cb5fa635c4049fe8553794155377412/P1S-compressed.jpg',
    },
    {
      name: 'Bambu Lab A1 mini Combo',
      description: 'Desktop multi-color 3D printer. Features full-auto calibration, active flow rate compensation, and AMS lite for multi-color.',
      price: 14999,
      category: '3D Printers',
      isFeatured: true,
      imageUrl: 'https://store.bblcdn.eu/s8/default/1604d9e9669947d2a62d1deb5eef7bef/A1_mini.jpg',
    },
    {
      name: 'UGREEN Nexode 100W GaN 4-Port',
      description: 'Fast charge laptops, phones, and accessories simultaneously with advanced GaN III technology and thermal guard.',
      price: 2450,
      category: 'Cables & GaN',
      isFeatured: true,
      imageUrl: 'https://eu.ugreen.com/cdn/shop/products/ugreen-nexode-100w-usb-c-gan-charger-4-port-wall-charger-662367.png',
    },
    {
      name: 'UGREEN 240W USB-C Digital Display Cable (2m)',
      description: 'Ultra-durable zinc alloy with Power Delivery 3.1 ultra-fast charging and real-time LED power display.',
      price: 950,
      category: 'Cables & GaN',
      isFeatured: false,
      imageUrl: 'https://eu.ugreen.com/cdn/shop/files/ugreen-usb-c-cable-240w-digital-display-8258007.png',
    }
  ];

  for (const item of sampleProducts) {
    await prisma.product.create({ data: item });
  }

  console.log('✅ Accounts & Real Products seeded successfully:');
  console.log(' - Admin:', admin.email, '(Role: ADMIN)');
  console.log(' - User:', normalUser.email, '(Role: USER)');
  console.log(` - Inserted ${sampleProducts.length} real products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
