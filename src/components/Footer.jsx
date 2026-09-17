import React from 'react';
import { Bike, Phone, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-100 border-t border-zinc-200 pt-16 pb-12 text-zinc-600 text-xs relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shadow-md">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-black text-xl text-black">
                  LS CYCLE STORE
                </span>
                <div className="text-[10px] text-zinc-600 font-semibold">
                  LAKSHMI SRINIVASA CYCLE STORE
                </div>
              </div>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed max-w-sm">
              Your premier destination for high-performance bicycles, interactive 3D cycle visualization, certified workshop repair services, and genuine replacement spare parts.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-black text-sm">Quick Links</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#hero" className="hover:text-black transition-colors">3D Home Showcase</a></li>
              <li><a href="#cycles" className="hover:text-black transition-colors">Cycle Sales Fleet</a></li>
              <li><a href="#services" className="hover:text-black transition-colors">Service Clinic & Packages</a></li>
              <li><a href="#parts" className="hover:text-black transition-colors">Spare Parts Catalog</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Repair Drop-Off Booking</a></li>
            </ul>
          </div>

          {/* Workshop Hours */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-black text-sm">Workshop Hours</h4>
            <div className="space-y-2 text-zinc-700">
              <div>
                <strong className="block text-black">Monday – Saturday:</strong>
                <span>9:00 AM – 9:00 PM</span>
              </div>
              <div>
                <strong className="block text-black">Sunday:</strong>
                <span>10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact Helpline */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-black text-sm">Customer Helpline</h4>
            <div className="space-y-2 text-zinc-700">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-black" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-black" />
                <span>support@lscyclestore.com</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="btn-secondary py-2 px-3 text-[11px] rounded-lg flex items-center gap-1.5"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 font-medium">
          <div>
            © {new Date().getFullYear()} LS (Lakshmi Srinivasa) Cycle Store. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-zinc-600">
            <span>Crafted for high performance cycling enthusiasts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
