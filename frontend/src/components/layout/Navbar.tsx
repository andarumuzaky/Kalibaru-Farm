"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Block scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const textColor = variant === "dark" && !isScrolled ? "text-secondary" : "text-primary";
  const logoColor = variant === "dark" && !isScrolled ? "text-secondary" : "text-primary";
  const navBg = isScrolled 
    ? "bg-secondary/90 backdrop-blur-md shadow-sm border-b border-primary/5 py-4" 
    : "bg-transparent py-6";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <Link href="/" className={`text-2xl md:text-3xl font-serif font-bold tracking-tight ${logoColor} transition-colors`}>
            Kalibaru <span className="text-tertiary italic">Farm</span>
          </Link>
          
          <div className={`hidden md:flex space-x-10 text-xs font-bold tracking-[0.15em] uppercase ${textColor}`}>
            <Link href="/" className="hover:text-tertiary transition-colors hover:-translate-y-0.5 inline-block">Beranda</Link>
            <Link href="/products" className="hover:text-tertiary transition-colors hover:-translate-y-0.5 inline-block">Produk</Link>
            <Link href="/blog" className="hover:text-tertiary transition-colors hover:-translate-y-0.5 inline-block">Blog</Link>
          </div>
          
          <Link href="#contact" className="hidden md:inline-block bg-primary text-secondary px-8 py-3 rounded-full text-xs font-bold tracking-widest shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-tertiary transition-all duration-300 uppercase">
            Hubungi Kami
          </Link>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 -mr-2 ${textColor} transition-colors`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-secondary pt-28 px-8 flex flex-col space-y-8 text-2xl font-serif text-primary transition-transform duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="border-b border-neutral/10 pb-4 hover:text-tertiary transition-colors">Beranda</Link>
        <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="border-b border-neutral/10 pb-4 hover:text-tertiary transition-colors">Semua Produk</Link>
        <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="border-b border-neutral/10 pb-4 hover:text-tertiary transition-colors">Catatan Farm</Link>
        <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="border-b border-neutral/10 pb-4 hover:text-tertiary transition-colors">Hubungi Kami</Link>
        <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-primary text-secondary text-center px-6 py-4 rounded-xl text-lg font-bold shadow-md mt-4 hover:bg-tertiary transition-colors">
          Pesan Sekarang
        </Link>
      </div>
    </>
  );
}
