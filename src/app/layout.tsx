import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoltEgypt | Premium 3D Printers & Accessories",
  description: "Egypt's premier destination for high-end 3D printers and premium electronic accessories.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative bg-[var(--color-bg-dark)] text-[var(--color-text-main)]">
        {/* Background glow effects */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-brand-blue)]/10 blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-brand-purple)]/10 blur-[120px] pointer-events-none" />
        
        <Navbar />
        <main className="flex-1 flex flex-col z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
