import Link from 'next/link';
import { ShoppingCart, User, Search, Globe } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b-0 rounded-none border-x-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <span className="text-gradient">VoltEgypt</span>
              <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] shadow-[0_0_10px_var(--color-brand-blue)]" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/printers" className="text-[var(--color-text-muted)] hover:text-white transition-colors text-sm font-medium tracking-wide">
              3D PRINTERS
            </Link>
            <Link href="/accessories" className="text-[var(--color-text-muted)] hover:text-white transition-colors text-sm font-medium tracking-wide">
              CABLES & ACCESSORIES
            </Link>
            <Link href="/offers" className="text-[var(--color-brand-purple)] hover:text-white transition-colors text-sm font-bold tracking-wide">
              OFFERS
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            <button className="text-[var(--color-text-muted)] hover:text-white transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-[var(--color-text-muted)] hover:text-white transition-colors flex items-center gap-1" aria-label="Language">
              <Globe className="w-5 h-5" />
              <span className="text-xs font-medium uppercase hidden sm:inline-block">EN</span>
            </button>
            <Link href="/account" className="text-[var(--color-text-muted)] hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="relative text-[var(--color-text-muted)] hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[var(--color-brand-blue)] text-[#000] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
