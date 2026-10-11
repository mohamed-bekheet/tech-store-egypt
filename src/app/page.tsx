export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import SeriesCatalog from '@/components/SeriesCatalog';
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Star, 
  CheckCircle2, 
  MessageCircle, 
  Tag, 
  CreditCard, 
  HelpCircle,
  PackageCheck
} from 'lucide-react';

export default async function Home() {
  // Fetch products live from Supabase
  let dbProducts: any[] = [];
  try {
    dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error loading products from Supabase:', error);
  }

  // Filter featured offers
  const featuredOffers = dbProducts.filter((p) => p.isFeatured);
  const regularProducts = dbProducts.filter((p) => !p.isFeatured);

  // Fallback defaults if database was just wiped
  const fallbackPrinters = [
    {
      id: 'p1',
      name: 'Bambu Lab X1-Carbon Combo',
      price: 144999,
      category: 'X-Serie',
      description: 'Flagship High-Speed Multi-Color 3D Printer. Equipped with AI lidar, dual auto bed leveling, and the AMS for up to 16 colors.',
      imageUrl: 'https://ardubotics.eu/14509-large/bambu-lab-x1-carbon.jpg',
      isFeatured: true,
      specs: [
        { label: "Series", value: "X-Serie (Flagship)" },
        { label: "Official EU", value: "€1,349" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Max Speed", value: "500 mm/s" }
      ]
    },
    {
      id: 'p2',
      name: 'Bambu Lab P1S Combo',
      price: 91999,
      category: 'P-Serie',
      description: 'Enclosed CoreXY 3D printer with 500mm/s print speed. Includes AMS for multi-color printing straight out of the box.',
      imageUrl: 'https://store.bblcdn.eu/s8/default/1cb5fa635c4049fe8553794155377412/P1S-compressed.jpg',
      isFeatured: true,
      specs: [
        { label: "Series", value: "P-Serie (Enclosed Workhorse)" },
        { label: "Official EU", value: "€849" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Max Speed", value: "500 mm/s" }
      ]
    },
    {
      id: 'p3',
      name: 'Bambu Lab A1 Combo',
      price: 48999,
      category: 'A-Serie',
      description: 'Full-size 256mm bed-slinger 3D printer with full-auto calibration, active motor noise cancellation, and quick-swap nozzle.',
      imageUrl: 'https://store.bblcdn.eu/s8/default/4820879d606b419a9e423066ec55f71c/A1-compressed.jpg',
      isFeatured: true,
      specs: [
        { label: "Series", value: "A-Serie (Multi-Color)" },
        { label: "Official EU", value: "€449" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Noise", value: "<48 dB Quiet" }
      ]
    },
    {
      id: 'p4',
      name: 'UGREEN Nexode 100W GaN 4-Port',
      price: 2450,
      category: 'Cables & GaN',
      description: 'Fast charge laptops, phones, and accessories simultaneously with advanced GaN III technology and thermal guard.',
      imageUrl: 'https://eu.ugreen.com/cdn/shop/products/ugreen-nexode-100w-usb-c-gan-charger-4-port-wall-charger-662367.png',
      isFeatured: false,
    },
  ];

  const displayFeatured = featuredOffers.length > 0 ? featuredOffers : fallbackPrinters.filter(p => p.isFeatured);
  const displayAll = dbProducts.length > 0 ? dbProducts : fallbackPrinters;

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* Friendly Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Egypt's Trusted 3D & Tech Store • Cairo Stock</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Original Tech & 3D Gear, <br />
                <span className="text-blue-500">Delivered Across Egypt.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Shop genuine Bambu Lab 3D printers, ultra-durable GaN chargers, and creator gear. We test every product and back every order with a <strong>1-year Egyptian warranty</strong> and <strong>Cash on Delivery</strong>.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <Link 
                  href="#products" 
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                >
                  Shop Best Sellers <ArrowRight className="w-4 h-4" />
                </Link>

                <a 
                  href="https://wa.me/201021853415?text=Hello%20Volt%20Egypt,%20I'd%20like%20to%20ask%20about%203D%20printers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#111827] hover:bg-[#1a2333] border border-white/10 text-white font-semibold text-center flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Ask on WhatsApp
                </a>
              </div>

              {/* Local Reassurances */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08] w-full text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% Authentic Units</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>24-48h Egypt Delivery</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CreditCard className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Cash on Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="store-card p-4 relative rounded-2xl overflow-hidden bg-[#121722] border-white/10 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
                  <img
                    src="https://ardubotics.eu/14509-large/bambu-lab-x1-carbon.jpg"
                    alt="Bambu Lab 3D Printer Egypt"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                    In Stock in Cairo
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">Bambu Lab X1-Carbon Combo</h3>
                    <p className="text-xs text-slate-400">Flagship High-Speed Multi-Color</p>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-400 font-extrabold text-lg">144,999 EGP</span>
                    <span className="block text-[11px] text-emerald-400 font-medium">Free Cairo Shipping</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Special Offer Alert Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-blue-900/40 via-[#131b2c] to-amber-900/30 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0 text-2xl">
              🔥
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                  Limited Time Bundle
                </span>
                <span className="text-xs text-slate-400">Save 950 EGP</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Get a FREE UGREEN 240W Cable with any 3D Printer order!
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Order any printer this week and receive an official high-speed power cable with full warranty included.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/201021853415?text=Hello%20Volt%20Egypt,%20I%20want%20to%20claim%20the%20Free%20Cable%203D%20Printer%20Bundle"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all"
          >
            Claim Offer on WhatsApp
          </a>
        </div>
      </section>

      {/* Featured Special Offers Section (Dynamic from Supabase) */}
      {displayFeatured.length > 0 && (
        <section id="offers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-orange-400" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Special Offers & Deals</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Hand-picked discounts on verified gear in our Egyptian warehouse
              </p>
            </div>
            <Link href="/admin" className="text-xs text-blue-400 hover:text-blue-300 font-medium">
              Manage in Admin →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayFeatured.map((product: any) => (
              <div key={product.id} className="store-card p-5 flex flex-col justify-between group">
                <Link href={`/product/${product.id}`} className="block">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-black/40">
                    <img
                      src={product.imageUrl || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow">
                      Special Offer 🔥
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300">{product.category}</span>
                    <span>•</span>
                    <span className="flex items-center text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current mr-1" /> 4.9 (Verified)
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>

                  {product.description && (
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                </Link>

                <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Egyptian Pounds</span>
                    <span className="text-xl font-bold text-blue-400">
                      {Number(product.price).toLocaleString()} EGP
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/201021853415?text=Hello%20Volt%20Egypt,%20I%20want%20to%20order:%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-md"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Product Catalog by Series (from Supabase) */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-2">
              <span>Bambu Lab Complete Series Lineup & Gear</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Browse by Series
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select between X-Serie, P-Serie, and A-Serie printers with authentic specs and doubled Euro pricing in EGP.
            </p>
          </div>
          <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-300 self-start md:self-auto">
            {displayAll.length} Products In Stock in Cairo
          </span>
        </div>

        <SeriesCatalog products={displayAll} />
      </section>

      {/* Why Egyptian Customers Trust Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Built for Egyptian Creators & Companies
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            No endless customs waiting, no counterfeit risks. Authentic tech ready to ship immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="store-card p-6 bg-[#111827]">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Fast Domestic Delivery</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Orders inside Cairo & Giza arrive within 24 to 48 hours. Alexandria and all delta/upper Egypt governorates arrive in 2-3 business days.
            </p>
          </div>

          <div className="store-card p-6 bg-[#111827]">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1-Year Egyptian Warranty</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every unit is genuine, unboxed factory fresh, and covered with 12 months warranty with direct spare parts available in Cairo.
            </p>
          </div>

          <div className="store-card p-6 bg-[#111827]">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Real Human Support</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Have technical questions before choosing between an A1 Mini or X1 Carbon? Chat directly with an engineer on WhatsApp 7 days a week.
            </p>
          </div>
        </div>
      </section>

      {/* Egyptian Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="store-card p-8 sm:p-12 bg-[#0e1422] border-white/10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Community Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
              Trusted by 500+ Makers in Egypt
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#131b2c] border border-white/5">
              <div className="flex items-center text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                "Ordered the Bambu Lab P1S to Maadi. Arrived the next afternoon properly packaged, genuine serial number verified on Bambu app. Best service!"
              </p>
              <div className="text-xs font-semibold text-white">Tarek M.</div>
              <div className="text-[11px] text-slate-400">Architect & Maker • Cairo</div>
            </div>

            <div className="p-5 rounded-xl bg-[#131b2c] border border-white/5">
              <div className="flex items-center text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                "The 100W GaN charger and 240W cables are incredible. They charge my MacBook Pro and iPad with zero overheating. 10/10."
              </p>
              <div className="text-xs font-semibold text-white">Nour El-Din</div>
              <div className="text-[11px] text-slate-400">Software Engineer • New Cairo</div>
            </div>

            <div className="p-5 rounded-xl bg-[#131b2c] border border-white/5">
              <div className="flex items-center text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                "Technical support on WhatsApp helped me set up filament profiles for my prints within minutes. Honest and professional guys."
              </p>
              <div className="text-xs font-semibold text-white">Karim S.</div>
              <div className="text-[11px] text-slate-400">Industrial Designer • Alexandria</div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-400" /> Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Everything you need to know before placing your order
          </p>
        </div>

        <div className="space-y-4">
          <div className="store-card p-5 bg-[#111827]">
            <h3 className="font-bold text-white text-base mb-1.5">Can I pay Cash on Delivery (COD)?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Yes! You can pay cash or through Instapay when our courier delivers the package to your doorstep in Cairo, Giza, or any governorate.
            </p>
          </div>

          <div className="store-card p-5 bg-[#111827]">
            <h3 className="font-bold text-white text-base mb-1.5">How long does delivery take?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Cairo and Giza orders placed before 3:00 PM are typically delivered within 24 to 48 hours. Other governorates take 2 to 3 working days.
            </p>
          </div>

          <div className="store-card p-5 bg-[#111827]">
            <h3 className="font-bold text-white text-base mb-1.5">Are all 3D printers and cables 100% original?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Yes, all items are factory sealed original goods imported from certified distributors, covered by our 1-year replacement warranty.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
