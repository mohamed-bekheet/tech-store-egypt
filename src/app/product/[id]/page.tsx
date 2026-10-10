import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, MessageCircle, Star } from 'lucide-react';

export default async function ProductPage({ params }: { params: { id: string } }) {
  // First, we check if we should fall back to dummy data if DB is empty
  let product = null;
  
  try {
    product = await prisma.product.findUnique({
      where: { id: params.id },
    });
  } catch (error) {
    console.error('Error finding product:', error);
  }

  // Fallback check if it's one of the hardcoded dummy products from page.tsx
  if (!product) {
    const fallbackPrinters = [
      {
        id: 'p1',
        name: 'Bambu Lab X1-Carbon Combo',
        price: 59999,
        category: '3D Printers',
        description: 'Flagship High-Speed Multi-Color 3D Printer. Equipped with AI lidar, dual auto bed leveling, and the AMS for up to 16 colors.',
        imageUrl: 'https://ardubotics.eu/14509-large/bambu-lab-x1-carbon.jpg',
        isFeatured: true,
      },
      {
        id: 'p2',
        name: 'Bambu Lab P1S Combo',
        price: 34999,
        category: '3D Printers',
        description: 'Enclosed CoreXY 3D printer with 500mm/s print speed. Includes AMS for multi-color printing straight out of the box.',
        imageUrl: 'https://store.bblcdn.eu/s8/default/1cb5fa635c4049fe8553794155377412/P1S-compressed.jpg',
        isFeatured: false,
      },
      {
        id: 'p3',
        name: 'UGREEN Nexode 100W GaN 4-Port',
        price: 2450,
        category: 'Cables & GaN',
        description: 'Fast charge laptops, phones, and accessories simultaneously with advanced GaN III technology and thermal guard.',
        imageUrl: 'https://eu.ugreen.com/cdn/shop/products/ugreen-nexode-100w-usb-c-gan-charger-4-port-wall-charger-662367.png',
        isFeatured: true,
      },
      {
        id: 'p4',
        name: 'UGREEN 240W USB-C Digital Display Cable (2m)',
        price: 950,
        category: 'Cables & GaN',
        description: 'Ultra-durable zinc alloy with Power Delivery 3.1 ultra-fast charging and real-time LED power display.',
        imageUrl: 'https://eu.ugreen.com/cdn/shop/files/ugreen-usb-c-cable-240w-digital-display-8258007.png',
        isFeatured: false,
      },
    ];
    product = fallbackPrinters.find(p => p.id === params.id) || null;
  }

  if (!product) {
    notFound();
  }

  const whatsappMessage = `Hello Volt Egypt, I would like to order the ${product.name} (Price: ${product.price} EGP). Is it currently in stock?`;

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
            {/* Mock thumbnails to make it look like a real gallery */}
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
            
            {/* We'll generate some dummy specs based on the category to make it look highly technical */}
            <h3 className="text-xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">Technical Specifications</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 text-sm">
              {product.category.includes('3D') ? (
                <>
                  <li className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg"><span className="text-blue-400 font-bold w-24 flex-shrink-0">Voltage:</span> <span>220V - 240V (Egyptian Standard)</span></li>
                  <li className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg"><span className="text-blue-400 font-bold w-24 flex-shrink-0">Warranty:</span> <span>1 Year Local Replacement</span></li>
                  <li className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg"><span className="text-blue-400 font-bold w-24 flex-shrink-0">Support:</span> <span>Lifetime WhatsApp Assistance</span></li>
                  <li className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg"><span className="text-blue-400 font-bold w-24 flex-shrink-0">Delivery:</span> <span>Free in Greater Cairo</span></li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg"><span className="text-blue-400 font-bold w-24 flex-shrink-0">Authenticity:</span> <span>100% Original UGREEN</span></li>
                  <li className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg"><span className="text-blue-400 font-bold w-24 flex-shrink-0">Warranty:</span> <span>1 Year Local Warranty</span></li>
                  <li className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg"><span className="text-blue-400 font-bold w-24 flex-shrink-0">Safety:</span> <span>Multi-protect Overheating</span></li>
                  <li className="flex items-start gap-2 bg-[#121722] p-3 rounded-lg"><span className="text-blue-400 font-bold w-24 flex-shrink-0">Delivery:</span> <span>Cash on Delivery available</span></li>
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
