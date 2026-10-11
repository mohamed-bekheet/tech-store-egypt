export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, MessageCircle, Star } from 'lucide-react';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id;

  let product: any = null;
  
  try {
    // 1. Check legacy aliases / shortcuts
    if (id === 'p1') {
      product = await prisma.product.findFirst({
        where: { name: { contains: 'X1-Carbon' } },
      });
    } else if (id === 'p2') {
      product = await prisma.product.findFirst({
        where: { name: { contains: 'P1S' } },
      });
    } else if (id === 'p3') {
      product = await prisma.product.findFirst({
        where: { name: { contains: 'A1' } },
      });
    } else if (id === 'p4') {
      product = await prisma.product.findFirst({
        where: { name: { contains: 'Nexode' } },
      });
    } else if (id) {
      // 2. Query by UUID
      product = await prisma.product.findUnique({
        where: { id },
      });
    }

    // 3. Fallback: search by name or category match if not found by exact ID
    if (!product && id) {
      product = await prisma.product.findFirst({
        where: {
          OR: [
            { name: { contains: id, mode: 'insensitive' } },
            { category: { contains: id, mode: 'insensitive' } },
          ],
        },
      });
    }
  } catch (error) {
    console.error('Error finding product:', error);
  }

  // 4. Default to flagship product if ID is invalid or not found, so users NEVER get an ugly 404
  if (!product) {
    try {
      product = await prisma.product.findFirst({
        where: { isFeatured: true },
      });
    } catch (e) {
      console.error('Fallback query error:', e);
    }
  }

  // 5. Hard fallback object in case of database disruption
  if (!product) {
    product = {
      id: '63ea58fd-532f-4df4-bca8-bf369ca08dd8',
      name: 'Bambu Lab X1-Carbon Combo',
      price: 144999,
      category: 'X-Serie',
      description: 'The pinnacle of high-speed multi-color 3D printing. Features CoreXY motion, dual auto bed leveling, 7μm micro-lidar inspection, aluminum chassis, and the Bambu Lab AMS system for up to 16 colors.',
      imageUrl: 'https://ardubotics.eu/14509-large/bambu-lab-x1-carbon.jpg',
      isFeatured: true,
      specs: [
        { label: "Series", value: "X-Serie (Flagship)" },
        { label: "Official EU", value: "€1,349" },
        { label: "Build Volume", value: "256 x 256 x 256 mm" },
        { label: "Max Speed", value: "500 mm/s" },
        { label: "Hotend", value: "Hardened Steel All-Metal" },
        { label: "Multi-Color", value: "Includes AMS (Up to 16 Colors)" }
      ]
    };
  }

  const whatsappMessage = `Hello Volt Egypt, I would like to order the ${product.name} (Price: ${Number(product.price).toLocaleString()} EGP). Is it currently in stock for Cairo delivery?`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-[#121722] border border-white/10 shadow-2xl flex items-center justify-center p-8">
            <img 
              src={product.imageUrl || 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800'} 
              alt={product.name} 
              className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            {product.isFeatured && (
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                🔥 Hot Deal
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Gallery thumbnails */}
            <div className="aspect-square rounded-xl bg-[#121722] border border-blue-500/50 cursor-pointer overflow-hidden p-2 flex items-center justify-center">
               <img src={product.imageUrl || 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200'} alt="thumbnail 1" className="w-full h-full object-contain" />
            </div>
            <div className="aspect-square rounded-xl bg-[#0e1422] border border-white/5 opacity-50 cursor-not-allowed overflow-hidden p-2 flex items-center justify-center hover:opacity-100 transition-opacity">
               <img src={product.imageUrl || 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200'} alt="thumbnail 2" className="w-full h-full object-contain filter grayscale" />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3 text-sm">
            <span className="text-slate-400 bg-white/5 px-3 py-1 rounded-full">{product.category}</span>
            <span className="text-amber-400 flex items-center bg-amber-400/10 px-3 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-current mr-1.5" /> 4.9 Rating
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            {product.name}
          </h1>

          <div className="mb-8">
            <div className="text-4xl font-black text-blue-400 mb-1">
              {Number(product.price).toLocaleString()} <span className="text-xl text-slate-400 font-bold">EGP</span>
            </div>
            <div className="text-sm text-emerald-400 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> In Stock - Ships from Cairo within 24h
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-10 text-slate-300 leading-relaxed text-lg">
            <p>{product.description}</p>
            
            {/* Render Real Technical Specs from DB */}
            <h3 className="text-xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">Technical Specifications</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 text-sm">
              {product.specs && Array.isArray(product.specs) ? (
                product.specs.map((spec: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg border border-white/5">
                    <span className="text-blue-400 font-bold min-w-[110px] flex-shrink-0">{spec.label}:</span> 
                    <span className="text-slate-200">{spec.value}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg border border-white/5"><span className="text-blue-400 font-bold min-w-[110px] flex-shrink-0">Warranty:</span> <span>1 Year Local Replacement</span></li>
                  <li className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg border border-white/5"><span className="text-blue-400 font-bold min-w-[110px] flex-shrink-0">Support:</span> <span>Lifetime WhatsApp Assistance</span></li>
                </>
              )}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto border-t border-white/10 pt-8">
            <a 
              href={`https://wa.me/201021853415?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all"
            >
              Order via WhatsApp <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/[0.05]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#121722] flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="text-white font-bold">Secure Order</div>
                <div className="text-slate-400">Cash on Delivery</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#121722] flex items-center justify-center text-blue-400">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="text-white font-bold">Fast Shipping</div>
                <div className="text-slate-400">All Governorates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
