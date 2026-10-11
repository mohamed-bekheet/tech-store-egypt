'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Cpu, 
  Box, 
  Layers, 
  Zap, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  ExternalLink,
  Search,
  SlidersHorizontal
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category: string;
  isFeatured: boolean;
  specs?: any;
}

interface SeriesCatalogProps {
  products: Product[];
}

export default function SeriesCatalog({ products }: SeriesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Series & Gear', icon: Layers, count: products.length },
    { id: 'X-Serie', label: 'X-Serie', subtitle: 'Flagship CoreXY & AI', icon: Cpu, count: products.filter(p => p.category === 'X-Serie').length },
    { id: 'P-Serie', label: 'P-Serie', subtitle: 'Enclosed Workhorses', icon: Box, count: products.filter(p => p.category === 'P-Serie').length },
    { id: 'A-Serie', label: 'A-Serie', subtitle: 'Full-Auto Bed-Slingers', icon: Sparkles, count: products.filter(p => p.category === 'A-Serie').length },
    { id: 'Cables & GaN', label: 'Cables & GaN', subtitle: 'Fast Charging Gear', icon: Zap, count: products.filter(p => p.category === 'Cables & GaN' || p.category === 'Accessories').length },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = 
        selectedCategory === 'all' 
          ? true 
          : selectedCategory === 'Cables & GaN'
            ? product.category === 'Cables & GaN' || product.category === 'Accessories'
            : product.category === selectedCategory;

      const matchesSearch = 
        product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchFilter.toLowerCase())) ||
        product.category.toLowerCase().includes(searchFilter.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchFilter]);

  return (
    <div className="w-full">
      {/* Category Navigation Pills */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Series Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                    : 'bg-[#121722] hover:bg-[#1a2333] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span>{cat.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${isActive ? 'bg-blue-700 text-blue-100' : 'bg-white/10 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter series..."
            className="w-full bg-[#121722] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Series Info Banners when a specific series is selected */}
      {selectedCategory === 'X-Serie' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/30 via-[#111827] to-cyan-900/20 border border-blue-500/20 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Bambu Lab X-Serie Lineup</h3>
              <p className="text-xs text-slate-300">
                Flagship CoreXY speed, AI Micro-Lidar inspection, carbon fiber capability, and full aluminum enclosures.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 self-start sm:self-auto">
            Official EU Pricing Doubled into EGP (All-inclusive)
          </span>
        </div>
      )}

      {selectedCategory === 'P-Serie' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-900/30 via-[#111827] to-purple-900/20 border border-indigo-500/20 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Bambu Lab P-Serie Lineup</h3>
              <p className="text-xs text-slate-300">
                CoreXY high-speed enclosed workhorses. Designed for ABS, ASA, and multi-color production with low maintenance.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 self-start sm:self-auto">
            Cairo Stock • 1-Year Local Warranty
          </span>
        </div>
      )}

      {selectedCategory === 'A-Serie' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900/30 via-[#111827] to-teal-900/20 border border-emerald-500/20 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Bambu Lab A-Serie Lineup</h3>
              <p className="text-xs text-slate-300">
                Full-auto calibration bed-slingers, ultra-quiet motor cancellation, quick-swap nozzles, and AMS lite multi-color.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
            Plug & Play in 20 Mins
          </span>
        </div>
      )}

      {/* Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#111827] rounded-2xl border border-white/5">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-white">No products found</h4>
          <p className="text-sm text-slate-400 mt-1">Try resetting your search filter or selecting another series.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchFilter(''); }}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            // Find EU reference spec if available
            const euSpec = Array.isArray(product.specs) 
              ? product.specs.find((s: any) => s.label === 'Official EU')
              : null;

            return (
              <div 
                key={product.id} 
                className="store-card p-4 flex flex-col justify-between group hover:border-blue-500/40 transition-all duration-300"
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* Product Image Card */}
                  <div className="aspect-square rounded-xl overflow-hidden mb-3 relative bg-[#121722] flex items-center justify-center p-3 border border-white/5">
                    <img
                      src={product.imageUrl || 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Series Badge */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded shadow ${
                        product.category === 'X-Serie' 
                          ? 'bg-blue-600 text-white' 
                          : product.category === 'P-Serie'
                            ? 'bg-indigo-600 text-white'
                            : product.category === 'A-Serie'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-orange-500 text-white'
                      }`}>
                        {product.category}
                      </span>
                      {product.isFeatured && (
                        <span className="bg-amber-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                          POPULAR
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Series Pill & Title */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold text-slate-300 truncate">{product.category}</span>
                    <span className="flex items-center text-amber-400">
                      <Star className="w-3 h-3 fill-current mr-0.5" /> 4.9
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white line-clamp-2 group-hover:text-blue-400 transition-colors leading-snug">
                    {product.name}
                  </h3>

                  {/* Brief specs highlight */}
                  {product.description && (
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                </Link>

                {/* Pricing & Order Actions */}
                <div className="pt-3 mt-3 border-t border-white/[0.08]">
                  {euSpec && (
                    <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                      <span>EU Direct:</span>
                      <span className="font-medium text-slate-300">{euSpec.value.split(' ')[0]}</span>
                    </div>
                  )}

                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Egypt Price (Duty Incl.)</span>
                      <div className="font-extrabold text-base text-white">
                        {Number(product.price).toLocaleString()} <span className="text-xs text-blue-400 font-bold">EGP</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/201021853415?text=${encodeURIComponent(`Hello Volt Egypt, I would like to order: ${product.name} (Price: ${Number(product.price).toLocaleString()} EGP). Is it currently available for Cairo delivery?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm shadow-blue-600/30 whitespace-nowrap"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
