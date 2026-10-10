import Link from 'next/link';
import { Zap, Truck, ShieldCheck, CreditCard, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#080b11] text-slate-400 mt-20">
      {/* Trust reassurance banner before footer */}
      <div className="border-b border-white/[0.06] py-8 bg-[#0e1420]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">Fast Egypt Shipping</h4>
                <p className="text-xs text-slate-400">24h Cairo • 48h Governorates</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">1-Year Warranty</h4>
                <p className="text-xs text-slate-400">100% Genuine guaranteed</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">Flexible Payment</h4>
                <p className="text-xs text-slate-400">Cash on delivery & Instapay</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">WhatsApp Support</h4>
                <p className="text-xs text-slate-400">Quick answers every day</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Volt<span className="text-blue-500">Egypt</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Egypt's trusted store for authentic Bambu Lab 3D printers, high-speed GaN chargers, and premium creator accessories.
            </p>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-2">
              <MapPin className="w-4 h-4 text-slate-400" /> Cairo, Egypt • Shipping nationwide
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/printers" className="hover:text-white transition-colors">3D Printers</Link></li>
              <li><Link href="/accessories" className="hover:text-white transition-colors">Cables & GaN Chargers</Link></li>
              <li><Link href="/offers" className="text-orange-400 hover:text-orange-300 transition-colors font-medium">Special Deals & Bundles</Link></li>
              <li><Link href="/filaments" className="hover:text-white transition-colors">PLA & PETG Filaments</Link></li>
            </ul>
          </div>
          
          {/* Customer Care */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Delivery Rates</Link></li>
              <li><Link href="/warranty" className="hover:text-white transition-colors">Warranty & Return Policy</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Store Admin Login</Link></li>
            </ul>
          </div>
          
          {/* Contact Details */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="https://wa.me/201021853415" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp: +20 102 185 3415
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>+20 102 185 3415 (Daily 10am - 10pm)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>support@voltegypt.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} VoltEgypt. Built for creators & makers in Egypt.
          </p>
          <div className="flex gap-6 text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <span>Payments: COD / Instapay / Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
