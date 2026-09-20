import React, { useState } from 'react';
import { X, ShoppingBag, Star, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function BikeModal({ bike, onClose, onAddToCart }) {
  if (!bike) return null;

  const [selectedColor, setSelectedColor] = useState(bike.colors[0]);
  const [selectedSize, setSelectedSize] = useState(bike.sizes[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl border border-zinc-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col md:flex-row max-h-[92vh] md:max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-white/90 sm:bg-zinc-100 border border-zinc-300 text-zinc-700 hover:text-black hover:bg-zinc-200 transition-all shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image & Preview */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-zinc-50 flex flex-col items-center justify-center relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-zinc-200">
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 badge-neon bg-black text-white border-black text-[10px] sm:text-xs">
            {bike.badge}
          </div>
          
          <div className="relative w-full h-44 sm:h-72 md:h-80 flex items-center justify-center mt-2 sm:mt-0">
            <img
              src={bike.image}
              alt={bike.name}
              className="w-full h-full object-cover rounded-xl sm:rounded-2xl border border-zinc-200 shadow-md"
            />
          </div>

          <div className="w-full mt-2.5 sm:mt-4 p-2 sm:p-3 glass-panel rounded-xl text-center border-zinc-200 bg-white">
            <span className="text-[11px] sm:text-xs text-zinc-800 font-semibold">
              Precision Hand-Built at Lakshmi Srinivasa Workshop
            </span>
          </div>
        </div>

        {/* Right Column: Bike Details & Selection */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 overflow-y-auto min-h-0 bg-white space-y-4 sm:space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-xs font-bold text-zinc-500 tracking-wider uppercase">
                {bike.category}
              </span>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-black font-bold">
                <Star className="w-3.5 h-3.5 fill-black text-black" />
                <span>{bike.rating} ({bike.reviews} reviews)</span>
              </div>
            </div>

            <h2 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-black leading-tight">
              {bike.name}
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm mt-0.5">{bike.subtitle}</p>
          </div>

          {/* Pricing */}
          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <span className="font-heading font-black text-2xl sm:text-3xl text-black">
              ₹{bike.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs sm:text-sm text-zinc-400 line-through">
              ₹{bike.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="badge-neon bg-zinc-100 text-black border-zinc-300 text-[10px] sm:text-xs font-bold">
              Save ₹{(bike.originalPrice - bike.price).toLocaleString('en-IN')}
            </span>
          </div>

          <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed font-normal">
            {bike.description}
          </p>

          {/* Technical Specs Breakdown */}
          <div className="space-y-1.5 sm:space-y-2 border-t border-b border-zinc-200 py-3 sm:py-4">
            <div className="text-[11px] sm:text-xs font-bold text-black uppercase tracking-wider mb-1.5 sm:mb-2">
              Technical Specifications:
            </div>
            {Object.entries(bike.specs).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between text-xs py-0.5">
                <span className="text-zinc-500 capitalize shrink-0">{key}:</span>
                <span className="text-black font-semibold text-right max-w-[180px] sm:max-w-[220px] truncate">{val}</span>
              </div>
            ))}
          </div>

          {/* Color Selector */}
          {bike.colors && bike.colors.length > 0 && (
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs font-bold text-zinc-800">Select Frame Finish:</label>
              <div className="flex items-center gap-3">
                {bike.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === color ? 'border-black scale-110 shadow-md' : 'border-zinc-300'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  >
                    {selectedColor === color && <Check className="w-3.5 h-3.5 text-white drop-shadow mix-blend-difference" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {bike.sizes && bike.sizes.length > 0 && (
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs font-bold text-zinc-800">Select Frame Size:</label>
              <div className="flex flex-wrap items-center gap-2">
                {bike.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white shadow-md'
                        : 'bg-zinc-100 text-zinc-800 border border-zinc-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-zinc-600 pt-1 sm:pt-2 font-medium">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" />
              <span>Lifetime Frame Warranty</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" />
              <span>Free Doorstep Delivery</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" />
              <span>Free 1st Service Included</span>
            </div>
          </div>

          {/* Action Add to Cart */}
          <div className="pt-2 sticky bottom-0 bg-white/95 backdrop-blur-sm sm:static sm:bg-transparent pb-1 sm:pb-0">
            <button
              onClick={() => {
                onAddToCart({ ...bike, selectedColor, selectedSize });
                onClose();
              }}
              className="btn-primary w-full py-3 sm:py-3.5 text-xs sm:text-sm rounded-xl flex justify-center items-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart - ₹{bike.price.toLocaleString('en-IN')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
