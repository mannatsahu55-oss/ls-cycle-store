import React, { useState, useEffect } from 'react';
import { ShoppingBag, Wrench, Menu, X, Bike, ChevronRight, Phone } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200 py-3 shadow-sm'
          : 'bg-white/70 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shadow-md">
            <Bike className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-heading font-black text-lg tracking-tight text-black flex items-center gap-1.5">
              <span>LS</span>
              <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-800">STORE</span>
            </div>
            <div className="text-[10px] text-zinc-600 font-semibold tracking-wider">
              LAKSHMI SRINIVASA
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wider uppercase text-zinc-700">
          <a href="#hero" className="hover:text-black transition-colors">Home</a>
          <a href="#cycles" className="hover:text-black transition-colors">Cycles Sales</a>
          <a href="#services" className="hover:text-black transition-colors">Service & Repair</a>
          <a href="#parts" className="hover:text-black transition-colors">Spare Parts</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact Us</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-zinc-100 border border-zinc-300 text-black hover:bg-zinc-200 transition-all"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black text-white text-[10px] font-black flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="btn-primary py-2.5 px-4 text-xs rounded-xl flex items-center gap-2"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Book a Service</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg bg-zinc-100 border border-zinc-300 text-black"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-100 border border-zinc-300 text-black"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-5">
          <nav className="flex flex-col space-y-3 text-sm font-bold text-zinc-800">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-zinc-100">Home</a>
            <a href="#cycles" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-zinc-100">Cycles Sales</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-zinc-100">Service & Repair</a>
            <a href="#parts" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-zinc-100">Spare Parts</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-zinc-100">Contact Us</a>
          </nav>
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="btn-primary w-full py-3 text-xs rounded-xl flex items-center justify-center gap-2"
          >
            <Wrench className="w-4 h-4" />
            <span>Book a Service</span>
          </button>
        </div>
      )}
    </header>
  );
}
