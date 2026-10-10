'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Zap, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f17]/95 backdrop-blur-md border-b border-white/[0.08]">
      {/* Top Friendly Announcement Banner */}
      <div className="bg-[#111827] border-b border-white/[0.06] text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Truck className="w-3.5 h-3.5" /> 24-48h Delivery in Cairo & Giza
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Official 1-Year Local Warranty
            </span>
            <span className="hidden lg:inline text-slate-500">•</span>
            <span className="hidden lg:inline text-slate-300">
              💵 Cash on Delivery Available
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <a 
              href="https://wa.me/201021853415" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp: +20 102 185 3415
            </a>
            <span className="text-slate-600">|</span>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Volt<span className="text-blue-500">Egypt</span>
              </div>
              <div className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                Maker & Power Tech
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Bambu Lab, GaN chargers, cables..."
                className="w-full bg-[#161f30] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium">
            <Link href="/printers" className="text-slate-300 hover:text-white transition-colors">
              3D Printers
            </Link>
            <Link href="/accessories" className="text-slate-300 hover:text-white transition-colors">
              Cables & GaN
            </Link>
            <Link href="/offers" className="flex items-center gap-1 text-orange-400 hover:text-orange-300 font-semibold transition-colors">
              <span>Offers & Deals</span>
              <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full border border-orange-500/30">
                Hot
              </span>
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/login"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
              title="Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
