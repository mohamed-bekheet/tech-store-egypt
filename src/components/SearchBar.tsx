'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { Search, X, Loader2, Sparkles, ArrowRight, Tag } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category: string;
  isFeatured: boolean;
  specs?: any;
  aliases?: string[];
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fetch all products once on mount / focus
  useEffect(() => {
    let isMounted = true;
    const fetchCatalog = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            // Enhance products with search aliases for powerful multi-term discovery
            const enhanced = data.map((item: any) => {
              const aliases: string[] = [];
              const lowerName = item.name.toLowerCase();
              
              if (lowerName.includes('x1')) {
                aliases.push('x1c', 'x-serie', 'x series', 'x1 carbon', 'x2d', 'flagship', 'carbon fiber');
              }
              if (lowerName.includes('p1')) {
                aliases.push('p1s', 'p1p', 'p-serie', 'p series', 'enclosed', 'corexy');
              }
              if (lowerName.includes('a1')) {
                aliases.push('a1', 'a1 mini', 'a-serie', 'a series', 'bed slinger', 'ams lite');
              }
              if (lowerName.includes('ams')) {
                aliases.push('multi color', 'multicolor', 'filament', 'spool');
              }
              if (lowerName.includes('ugreen') || lowerName.includes('cable') || lowerName.includes('gan')) {
                aliases.push('charger', 'type c', 'usb-c', 'display cable', '240w', '100w', 'fast charging');
              }

              return { ...item, aliases };
            });

            setProducts(enhanced);
          }
        }
      } catch (err) {
        console.error('Failed to load search catalog:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCatalog();
    return () => { isMounted = false; };
  }, []);

  // Configure Fuse.js with weighted fields and typo-tolerant fuzzy matching
  const fuse = useMemo(() => {
    if (products.length === 0) return null;

    return new Fuse(products, {
      keys: [
        { name: 'name', weight: 0.45 },
        { name: 'aliases', weight: 0.25 },
        { name: 'category', weight: 0.15 },
        { name: 'description', weight: 0.1 },
        { name: 'specs.value', weight: 0.05 },
      ],
      threshold: 0.4, // Balanced fuzzy tolerance (handles typos like 'bamboolab', 'x2d', 'ugren')
      distance: 100,
      minMatchCharLength: 2,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [products]);

  // Execute search query
  const searchResults = useMemo(() => {
    if (!query.trim() || !fuse) return [];
    const results = fuse.search(query.trim());
    return results.slice(0, 6).map(res => res.item);
  }, [query, fuse]);

  // Handle clicking outside to dismiss dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation (Arrow keys, Enter, Esc)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && searchResults[selectedIndex]) {
        handleSelectProduct(searchResults[selectedIndex].id);
      } else if (searchResults.length > 0) {
        handleSelectProduct(searchResults[0].id);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectProduct = (productId: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(`/product/${productId}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'X-Serie':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'P-Serie':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'A-Serie':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    }
  };

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-md">
      {/* Search Input Box */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search Bambu Lab X1, P1S, A1, GaN, cables..."
          className="w-full bg-[#161f30] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
        />

        {/* Clear or Loading Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
          ) : query ? (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-white transition-colors p-0.5 rounded-full hover:bg-white/10"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Live Dropdown Results Modal */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#0e1422]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-white/[0.06] animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header */}
          <div className="px-4 py-2.5 bg-[#141b2b] flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              {searchResults.length > 0 ? (
                <>Found <strong>{searchResults.length}</strong> matching items</>
              ) : (
                <>Search Results</>
              )}
            </span>
            <span className="text-[11px] text-slate-500">Press ↑↓ to navigate, Enter to view</span>
          </div>

          {/* Results List */}
          {searchResults.length > 0 ? (
            <div className="max-h-[380px] overflow-y-auto divide-y divide-white/[0.04]">
              {searchResults.map((product, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-600/20 border-l-2 border-blue-500' : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-xl bg-[#121722] border border-white/10 flex-shrink-0 p-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.imageUrl || 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120'}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getCategoryColor(product.category)}`}>
                          {product.category}
                        </span>
                        {product.isFeatured && (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">
                            HOT
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-white truncate hover:text-blue-400 transition-colors">
                        {product.name}
                      </h4>
                    </div>

                    {/* Price & Action */}
                    <div className="text-right flex-shrink-0 flex items-center gap-3">
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Price</div>
                        <div className="text-sm font-black text-blue-400">
                          {Number(product.price).toLocaleString()} <span className="text-[10px] font-bold">EGP</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* No Direct Match - Show Smart Fallback & Suggestions */
            <div className="p-6 text-center">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center mb-2">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">No exact match for "{query}"</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-4">
                Did you mean one of our Bambu Lab series or fast-charging cables?
              </p>

              {/* Suggestions Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['X1-Carbon', 'P1S Combo', 'A1 mini', 'UGREEN 240W Cable'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="text-xs bg-white/5 hover:bg-blue-600 hover:text-white text-slate-300 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Jump to Catalog */}
          <div className="p-2.5 bg-[#121724] text-center">
            <Link
              href="/#products"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
            >
              Browse all {products.length} products in full catalog <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}
