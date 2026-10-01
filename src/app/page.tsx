import Link from 'next/link';
import { ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';

// Mock Data
const featuredPrinters = [
  { id: 'p1', name: 'Bambu Lab X1-Carbon', price: 'EGP 59,999', rating: 4.9, image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p2', name: 'Bambu Lab P1S', price: 'EGP 34,999', rating: 4.8, image: 'https://images.unsplash.com/photo-1631541909061-71e34df0fe54?auto=format&fit=crop&q=80&w=800' },
  { id: 'p3', name: 'Bambu Lab A1 Mini', price: 'EGP 14,999', rating: 4.7, image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=800' },
];

const featuredAccessories = [
  { id: 'a1', name: 'UGREEN 240W USB-C Cable', price: 'EGP 950', rating: 4.9, image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800' },
  { id: 'a2', name: 'UGREEN 100W GaN Charger', price: 'EGP 2,450', rating: 4.8, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800' },
  { id: 'a3', name: 'Premium PLA Filament 1kg', price: 'EGP 850', rating: 4.6, image: 'https://images.unsplash.com/photo-1628148810757-bbbc92dc9fb2?auto=format&fit=crop&q=80&w=800' },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-[var(--color-brand-purple)]/30 text-[var(--color-brand-purple)] text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>New Arrival</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1]">
                REVOLUTIONIZE <br />
                <span className="text-gradient">YOUR CREATIONS.</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed">
                Discover the next generation of high-speed 3D printers and premium power accessories. Build faster, charge smarter.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/printers" className="glow-button px-8 py-4 rounded-lg font-bold flex items-center gap-2">
                  Explore Printers <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/accessories" className="px-8 py-4 rounded-lg font-bold glass-panel hover:bg-white/5 transition-colors">
                  Shop Cables
                </Link>
              </div>
            </div>
            
            <div className="relative lg:h-[600px] flex items-center justify-center">
              {/* Decorative rings */}
              <div className="absolute inset-0 border border-[var(--color-brand-blue)]/20 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-8 border border-[var(--color-brand-purple)]/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              
              {/* Hero Image Mock */}
              <div className="relative z-10 w-full max-w-md aspect-square rounded-2xl overflow-hidden glass-panel p-2">
                <img 
                  src="https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&q=80&w=800" 
                  alt="3D Printer" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner / Offer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[var(--color-brand-blue)]/10 to-[var(--color-brand-purple)]/10 border-[var(--color-brand-blue)]/30">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold">Bundle & Save! 🎉</h2>
            <p className="text-[var(--color-text-muted)] max-w-xl">
              Get a <strong className="text-white">FREE UGREEN 240W Cable</strong> when you purchase any Bambu Lab 3D Printer. Limited time offer.
            </p>
          </div>
          <Link href="/offers" className="glow-button px-6 py-3 rounded-lg font-bold whitespace-nowrap">
            Claim Offer
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-y border-[var(--color-border-card)] py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[var(--color-brand-blue)]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Flat Rate Shipping</h3>
              <p className="text-sm text-[var(--color-text-muted)]">200 EGP anywhere in Egypt</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[var(--color-brand-purple)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Original Products</h3>
              <p className="text-sm text-[var(--color-text-muted)]">100% authentic guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[var(--color-brand-blue)]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="text-sm text-[var(--color-text-muted)]">2-4 business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Printers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured 3D Printers</h2>
          <Link href="/printers" className="text-[var(--color-brand-blue)] hover:text-white transition-colors font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPrinters.map((product) => (
            <div key={product.id} className="glass-panel p-4 group cursor-pointer hover:border-[var(--color-brand-blue)]/50 transition-all">
              <div className="aspect-square rounded-xl overflow-hidden mb-4 relative bg-black/40">
                <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <div className="flex items-center text-yellow-400 text-sm font-bold">
                    ★ {product.rating}
                  </div>
                </div>
                <p className="text-[var(--color-brand-blue)] font-bold text-xl">{product.price}</p>
                <button className="w-full mt-4 py-3 rounded-lg glass-panel font-bold hover:bg-white/10 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accessories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Cables & Accessories</h2>
          <Link href="/accessories" className="text-[var(--color-brand-purple)] hover:text-white transition-colors font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAccessories.map((product) => (
            <div key={product.id} className="glass-panel p-4 group cursor-pointer hover:border-[var(--color-brand-purple)]/50 transition-all">
              <div className="aspect-square rounded-xl overflow-hidden mb-4 relative bg-black/40">
                <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <div className="flex items-center text-yellow-400 text-sm font-bold">
                    ★ {product.rating}
                  </div>
                </div>
                <p className="text-[var(--color-brand-purple)] font-bold text-xl">{product.price}</p>
                <button className="w-full mt-4 py-3 rounded-lg glass-panel font-bold hover:bg-white/10 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
