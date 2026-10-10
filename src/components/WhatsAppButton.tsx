'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/201021853415?text=Hello%20Volt%20Egypt%20team,%20I%20have%20an%20inquiry%20about%20a%20product"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25d366] text-black font-bold shadow-2xl hover:scale-105 transition-all duration-200 group"
    >
      <MessageCircle className="w-5 h-5 text-black fill-current" />
      <span className="text-xs sm:text-sm font-semibold pr-1">Need Help? Chat with us</span>
    </a>
  );
}
