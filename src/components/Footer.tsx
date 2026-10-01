import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-card)] bg-[#030407] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2 mb-4">
              <span className="text-gradient">VoltEgypt</span>
            </Link>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
              Egypt's premier destination for high-end 3D printers and premium electronic accessories. Powering makers and creators.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><Link href="/printers" className="hover:text-[var(--color-brand-blue)] transition-colors">3D Printers</Link></li>
              <li><Link href="/accessories" className="hover:text-[var(--color-brand-blue)] transition-colors">Cables & Adapters</Link></li>
              <li><Link href="/offers" className="hover:text-[var(--color-brand-purple)] transition-colors">Special Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns Policy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>WhatsApp: <a href="https://wa.me/201021853415" className="hover:text-[var(--color-brand-blue)] transition-colors">+20 102 185 3415</a></li>
              <li>Email: support@voltegypt.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[var(--color-border-card)] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--color-text-muted)] text-xs">
            &copy; {new Date().getFullYear()} VoltEgypt. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0 text-[var(--color-text-muted)] text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
