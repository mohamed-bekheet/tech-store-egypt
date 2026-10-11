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

  // Clear existing products to sync perfectly with the full series lineup
  await prisma.product.deleteMany({});

  // 3. Complete Bambu Lab Series Lineup (Euro Prices Doubled into Egyptian Pounds)
  // Conversion basis: Official EU Euro Price * 54 EGP * 2 = 108 EGP / Euro (covering customs, air shipping, VAT, and Cairo local warranty)
  const fullProducts = [
    // ==========================================
    // X-SERIE (Flagship & AI Powerhouse)
    // ==========================================
    {
      name: 'Bambu Lab X1-Carbon Combo',
      description: 'The pinnacle of high-speed multi-color 3D printing. Features CoreXY motion, dual auto bed leveling, 7μm micro-lidar inspection, aluminum chassis, and the Bambu Lab AMS system for up to 16 colors.',
      price: 144999, // Official EU: €1,349 -> Doubled: 144,999 EGP
      category: 'X-Serie',
      isFeatured: true,
      imageUrl: 'https://ardubotics.eu/14509-large/bambu-lab-x1-carbon.jpg',
      specs: [
        { label: "Series", value: "X-Serie (Flagship)" },
        { label: "Official EU", value: "€1,349 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Max Speed", value: "500 mm/s (Acceleration: 20,000 mm/s²)" },
        { label: "Hotend", value: "Hardened Steel All-Metal (300°C Max)" },
        { label: "Enclosure", value: "Aluminum & Tempered Glass" },
        { label: "AI Features", value: "Dual AI Micro Lidar + 1080p Camera" },
        { label: "Multi-Color", value: "Includes AMS Unit (Up to 16 Colors)" },
        { label: "Materials", value: "Carbon Fiber (PA-CF, PET-CF), PC, ABS, ASA, TPU, PLA" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },
    {
      name: 'Bambu Lab X1-Carbon (Standalone)',
      description: 'The flagship CoreXY 3D printer for engineers and creators. Equipped with micro-lidar failure detection, active vibration compensation, hardened extruder gears, and an enclosed chamber.',
      price: 112999, // Official EU: €1,049 -> Doubled: 112,999 EGP
      category: 'X-Serie',
      isFeatured: false,
      imageUrl: 'https://ardubotics.eu/14509-large/bambu-lab-x1-carbon.jpg',
      specs: [
        { label: "Series", value: "X-Serie (Flagship)" },
        { label: "Official EU", value: "€1,049 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Max Speed", value: "500 mm/s (Acceleration: 20,000 mm/s²)" },
        { label: "Hotend", value: "Hardened Steel All-Metal (300°C Max)" },
        { label: "Enclosure", value: "Aluminum & Tempered Glass" },
        { label: "AI Features", value: "Dual AI Micro Lidar + First Layer Inspection" },
        { label: "Multi-Color", value: "AMS Ready (Expandable to 16 Colors)" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },
    {
      name: 'Bambu Lab X1E Combo (Enterprise Edition)',
      description: 'Industrial-grade flagship engineered for enterprises and research labs. Features actively heated chamber up to 60°C, heavy-duty H12 HEPA and carbon filtration, 320°C nozzle, and RJ45 Ethernet.',
      price: 269999, // Official EU: €2,499 -> Doubled: 269,999 EGP
      category: 'X-Serie',
      isFeatured: false,
      imageUrl: 'https://store.bblcdn.eu/s8/default/3ceb682d99a1432fa7d4d31b530d85aa/X1E.jpg',
      specs: [
        { label: "Series", value: "X-Serie (Enterprise)" },
        { label: "Official EU", value: "€2,499 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Chamber Heat", value: "Actively Controlled Chamber (Up to 60°C)" },
        { label: "Filtration", value: "G3 Pre-filter + H12 HEPA + Coconut Activated Carbon" },
        { label: "Hotend", value: "320°C All-Metal (PPA-CF, PPS, PPS-CF, Carbon Fiber)" },
        { label: "Security", value: "RJ45 Ethernet & WPA2-Enterprise Wi-Fi + Physical Kill Switch" },
        { label: "Multi-Color", value: "Includes AMS Unit (Up to 16 Colors)" }
      ]
    },

    // ==========================================
    // P-SERIE (High-Speed Enclosed Workhorse)
    // ==========================================
    {
      name: 'Bambu Lab P1S Combo',
      description: 'The ultimate high-speed enclosed 3D printer. Features CoreXY motion, auxiliary cooling fan, activated carbon odor filtration, and includes the AMS unit for 4-color multi-material prints.',
      price: 91999, // Official EU: €849 -> Doubled: 91,999 EGP
      category: 'P-Serie',
      isFeatured: true,
      imageUrl: 'https://store.bblcdn.eu/s8/default/1cb5fa635c4049fe8553794155377412/P1S-compressed.jpg',
      specs: [
        { label: "Series", value: "P-Serie (Enclosed Workhorse)" },
        { label: "Official EU", value: "€849 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Max Speed", value: "500 mm/s (Acceleration: 20,000 mm/s²)" },
        { label: "Hotend", value: "All-Metal (300°C Max)" },
        { label: "Enclosure", value: "Fully Enclosed (Polymer Body & Glass Door/Roof)" },
        { label: "Filtration", value: "Auxiliary Part Cooling Fan & Activated Carbon Filter" },
        { label: "Multi-Color", value: "Includes AMS (Up to 16 Colors)" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },
    {
      name: 'Bambu Lab P1S (Standalone)',
      description: 'Reliable enclosed CoreXY 3D printer capable of 500 mm/s high-speed printing. Designed to effortlessly print ABS, ASA, and PETG straight out of the box with built-in chamber cooling.',
      price: 64999, // Official EU: €599 -> Doubled: 64,999 EGP
      category: 'P-Serie',
      isFeatured: false,
      imageUrl: 'https://store.bblcdn.com/s7/default/258894d33635479292946c77752dbdf1/P1S-compressed.jpg',
      specs: [
        { label: "Series", value: "P-Serie (Enclosed Workhorse)" },
        { label: "Official EU", value: "€599 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Max Speed", value: "500 mm/s" },
        { label: "Hotend", value: "All-Metal (300°C Max)" },
        { label: "Enclosure", value: "Fully Enclosed with Cooling Fan & Carbon Filter" },
        { label: "Multi-Color", value: "AMS Ready (Expandable to 16 Colors)" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },
    {
      name: 'Bambu Lab P1P (Standalone)',
      description: 'Open-frame CoreXY high-speed 3D printer. Exceptional print quality with active vibration compensation, automatic bed leveling, and DIY 3D-printable custom side enclosures.',
      price: 53999, // Official EU: €499 -> Doubled: 53,999 EGP
      category: 'P-Serie',
      isFeatured: false,
      imageUrl: 'https://cdn.simplyprint.io/i/printer_types/bambu_lab/p1p/product_photo_md.png',
      specs: [
        { label: "Series", value: "P-Serie (Open CoreXY)" },
        { label: "Official EU", value: "€499 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Max Speed", value: "500 mm/s" },
        { label: "Design", value: "Open-Frame CoreXY (Print your own enclosure mod)" },
        { label: "Hotend", value: "All-Metal (300°C Max)" },
        { label: "Calibration", value: "Automatic Bed Leveling & Vibration Compensation" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },

    // ==========================================
    // A-SERIE (Quiet Full-Auto Bed-Slingers)
    // ==========================================
    {
      name: 'Bambu Lab A1 Combo (with AMS lite)',
      description: 'Full-size 256mm bed-slinger 3D printer with full-auto calibration, active motor noise cancellation, and quick-swap nozzle. Comes with AMS lite for 4-color multi-color printing.',
      price: 48999, // Official EU: €449 -> Doubled: 48,999 EGP
      category: 'A-Serie',
      isFeatured: true,
      imageUrl: 'https://store.bblcdn.eu/s8/default/4820879d606b419a9e423066ec55f71c/A1-compressed.jpg',
      specs: [
        { label: "Series", value: "A-Serie (Multi-Color)" },
        { label: "Official EU", value: "€449 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Max Speed", value: "500 mm/s (Acceleration: 10,000 mm/s²)" },
        { label: "Calibration", value: "Full-Auto (Z-offset, Bed Leveling & Active Flow Rate)" },
        { label: "Hotend", value: "Quick-Swap All-Metal (300°C Max)" },
        { label: "Noise", value: "Whisper-Quiet (<48 dB Active Motor Noise Cancellation)" },
        { label: "Multi-Color", value: "Includes AMS lite (4 Colors)" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },
    {
      name: 'Bambu Lab A1 (Standalone)',
      description: 'Full-size bed-slinger 3D printer featuring active flow rate calibration, 1-clip quick-swap nozzle, whisper-quiet operation, and seamless Bambu Handy cloud control.',
      price: 32499, // Official EU: €299 -> Doubled: 32,499 EGP
      category: 'A-Serie',
      isFeatured: false,
      imageUrl: 'https://store.bblcdn.eu/s8/default/4820879d606b419a9e423066ec55f71c/A1-compressed.jpg',
      specs: [
        { label: "Series", value: "A-Serie (Bed-Slinger)" },
        { label: "Official EU", value: "€299 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Max Speed", value: "500 mm/s" },
        { label: "Calibration", value: "Full-Auto Calibration" },
        { label: "Hotend", value: "Quick-Swap Nozzle System" },
        { label: "Noise", value: "Whisper-Quiet (<48 dB)" },
        { label: "Multi-Color", value: "AMS lite Ready" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },
    {
      name: 'Bambu Lab A1 mini Combo (with AMS lite)',
      description: 'Desktop multi-color 3D printer. Features full-auto calibration, active flow dynamics, and AMS lite for seamless 4-color creation right on your desk with zero hassle.',
      price: 37999, // Official EU: €349 -> Doubled: 37,999 EGP
      category: 'A-Serie',
      isFeatured: true,
      imageUrl: 'https://store.bblcdn.eu/s8/default/1604d9e9669947d2a62d1deb5eef7bef/A1_mini.jpg',
      specs: [
        { label: "Series", value: "A-Serie (Desktop Mini)" },
        { label: "Official EU", value: "€349 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Build Volume", value: "180 x 180 x 180 mm" },
        { label: "Max Speed", value: "500 mm/s" },
        { label: "Calibration", value: "Full-Auto Plug-and-Play (Pre-assembled)" },
        { label: "Hotend", value: "Quick-Swap All-Metal (300°C Max)" },
        { label: "Multi-Color", value: "Includes AMS lite (4 Colors)" },
        { label: "Noise", value: "Ultra-Quiet (<48 dB)" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },
    {
      name: 'Bambu Lab A1 mini (Standalone)',
      description: 'The most accessible premium 3D printer. Plug-and-play in 20 minutes, full-auto calibration, whisper-quiet operation, and ultra-smooth 500 mm/s printing.',
      price: 21999, // Official EU: €199 -> Doubled: 21,999 EGP
      category: 'A-Serie',
      isFeatured: false,
      imageUrl: 'https://store.bblcdn.eu/s8/default/1604d9e9669947d2a62d1deb5eef7bef/A1_mini.jpg',
      specs: [
        { label: "Series", value: "A-Serie (Desktop Mini)" },
        { label: "Official EU", value: "€199 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Build Volume", value: "180 x 180 x 180 mm" },
        { label: "Max Speed", value: "500 mm/s" },
        { label: "Calibration", value: "Full-Auto Calibration" },
        { label: "Hotend", value: "Quick-Swap Hotend" },
        { label: "Multi-Color", value: "AMS lite Ready" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },

    // ==========================================
    // MULTI-COLOR SYSTEMS & ACCESSORIES
    // ==========================================
    {
      name: 'Bambu Lab AMS (Automatic Material System)',
      description: 'Official 4-spool multi-material feeding unit with airtight humidity seal. Compatible with X1-Carbon, X1E, P1S, and P1P printers. Connect up to 4 units for 16 colors.',
      price: 37999, // Official EU: €349 -> Doubled: 37,999 EGP
      category: 'Accessories',
      isFeatured: false,
      imageUrl: 'https://ardubotics.eu/14509-large/bambu-lab-x1-carbon.jpg',
      specs: [
        { label: "Series", value: "Bambu Ecosystem" },
        { label: "Official EU", value: "€349 (Doubled into EGP with Egypt Duty & Air Freight)" },
        { label: "Capacity", value: "4 Filament Spools" },
        { label: "Compatibility", value: "X1-Carbon, X1E, P1S, P1P (Chain up to 16 Colors)" },
        { label: "Airtight Seal", value: "O-Ring with Desiccant Compartments & Humidity Gauge" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },

    // ==========================================
    // UGREEN CHARGING & CABLES
    // ==========================================
    {
      name: 'UGREEN Nexode 100W GaN 4-Port Fast Charger',
      description: 'Fast charge laptops, phones, and 3D printing control tablets simultaneously with GaN III technology and Thermal Guard heat protection.',
      price: 2450,
      category: 'Cables & GaN',
      isFeatured: true,
      imageUrl: 'https://eu.ugreen.com/cdn/shop/products/ugreen-nexode-100w-usb-c-gan-charger-4-port-wall-charger-662367.png',
      specs: [
        { label: "Total Output", value: "100W Max" },
        { label: "Ports", value: "3x USB-C, 1x USB-A" },
        { label: "Technology", value: "GaN III Fast Charge" },
        { label: "Protection", value: "Thermal Guard Over-temperature" },
        { label: "Compatibility", value: "MacBook, iPhone, Galaxy, Dell, iPad" }
      ]
    },
    {
      name: 'UGREEN 240W USB-C Digital Display Cable (1m)',
      description: 'Official Amazon.de listed UGREEN 240W USB-C to USB-C cable featuring integrated real-time smart digital LED wattage display, PD 3.1 ultra-fast charging, E-Marker safety chip, and military-grade nylon braided jacket.',
      price: 2900, // Price updated to 2,900 L.E
      category: 'Cables & GaN',
      isFeatured: true,
      imageUrl: 'https://eu.ugreen.com/cdn/shop/files/ugreen-usb-c-cable-240w-digital-display-8258007.png',
      specs: [
        { label: "Series", value: "UGREEN Smart Charging" },
        { label: "Amazon Ref", value: "Amazon.de ASIN: B0F62S8P1T (Model 65866)" },
        { label: "Official EU", value: "€18.99 (Amazon.de)" },
        { label: "Power Output", value: "240W Max (PD 3.1, 48V/5A Ultra-Fast)" },
        { label: "Smart Display", value: "Real-time LED Screen (Wattage Output)" },
        { label: "Safety Chip", value: "Dual E-Marker Intelligent Thermal Guard" },
        { label: "Data Speed", value: "480 Mbps" },
        { label: "Material", value: "Zinc Alloy + Premium Nylon Braided" },
        { label: "Length", value: "1 Meter (3.3 ft)" },
        { label: "Compatibility", value: "MacBook Pro/Air, iPhone 15/16, Galaxy S24, Steam Deck, Dell XPS" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    },
    {
      name: 'UGREEN 240W USB-C Digital Display Cable (2m)',
      description: 'Ultra-durable zinc alloy with Power Delivery 3.1 ultra-fast charging, real-time LED power wattage display, and extra 2-meter reach.',
      price: 1850,
      category: 'Cables & GaN',
      isFeatured: false,
      imageUrl: 'https://eu.ugreen.com/cdn/shop/files/ugreen-usb-c-cable-240w-digital-display-8258007.png',
      specs: [
        { label: "Power Output", value: "240W (48V/5A) PD 3.1" },
        { label: "Data Transfer", value: "480 Mbps" },
        { label: "Material", value: "Zinc Alloy & Nylon Braided" },
        { label: "Display", value: "Real-time LED Power Output (Wattage)" },
        { label: "Length", value: "2 Meters (6.6 ft)" },
        { label: "Warranty", value: "1 Year Volt Egypt Official Warranty" }
      ]
    }
  ];

  for (const item of fullProducts) {
    await prisma.product.create({ data: item });
  }

  console.log('✅ Accounts & All Bambu Lab Series (X, P, A) seeded successfully:');
  console.log(' - Admin:', admin.email, '(Role: ADMIN)');
  console.log(' - User:', normalUser.email, '(Role: USER)');
  console.log(` - Inserted ${fullProducts.length} real products across X-Serie, P-Serie, A-Serie & Accessories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
