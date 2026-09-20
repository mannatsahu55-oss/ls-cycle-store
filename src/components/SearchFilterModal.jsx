import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, SlidersHorizontal, ArrowRight, ShoppingBag, Eye, Star, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { CYCLES_DATA } from '../data/mockData';

export default function SearchFilterModal({ onAddToCart, onSelectBike }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'kids', 'ranger', 'gear', 'racing'
  const [maxPrice, setMaxPrice] = useState(200000);
  const [minPrice, setMinPrice] = useState(0);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const cycleTypes = [
    { id: 'all', label: 'All Cycles' },
    { id: 'kids', label: 'Kids Cycle', desc: 'Ages 4-12 & Junior' },
    { id: 'ranger', label: 'Ranger Cycle', desc: 'MTB & Rough Terrain' },
    { id: 'gear', label: 'Gear Cycle', desc: 'Multi-Speed Geared' },
    { id: 'racing', label: 'Racing Cycle', desc: 'Road Aero & Speed' }
  ];

  const pricePresets = [
    { label: 'All Prices', min: 0, max: 200000 },
    { label: 'Under ₹15K', min: 0, max: 15000 },
    { label: '₹15K - ₹50K', min: 15000, max: 50000 },
    { label: '₹50K - ₹1L', min: 50000, max: 100000 },
    { label: '₹1L+', min: 100000, max: 200000 }
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setMinPrice(0);
    setMaxPrice(200000);
  };

  const filteredProducts = useMemo(() => {
    return CYCLES_DATA.filter((bike) => {
      // Search query filter
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        bike.name.toLowerCase().includes(query) ||
        bike.subtitle.toLowerCase().includes(query) ||
        bike.description.toLowerCase().includes(query) ||
        (bike.category && bike.category.toLowerCase().includes(query));

      // Cycle type filter
      const matchesType =
        selectedType === 'all' ||
        (bike.cycleTypes && bike.cycleTypes.includes(selectedType)) ||
        (selectedType === 'kids' && (bike.category === 'kids' || bike.name.toLowerCase().includes('kid'))) ||
        (selectedType === 'ranger' && (bike.category === 'mountain' || bike.name.toLowerCase().includes('ranger') || bike.name.toLowerCase().includes('trail'))) ||
        (selectedType === 'gear' && (bike.cycleTypes?.includes('gear') || bike.specs?.drivetrain?.toLowerCase().includes('speed'))) ||
        (selectedType === 'racing' && (bike.category === 'road' || bike.subtitle.toLowerCase().includes('racer') || bike.name.toLowerCase().includes('aero')));

      // Price range filter
      const matchesPrice = bike.price >= minPrice && bike.price <= maxPrice;

      return matchesQuery && matchesType && matchesPrice;
    });
  }, [searchQuery, selectedType, minPrice, maxPrice]);

  const hasActiveFilters = searchQuery !== '' || selectedType !== 'all' || minPrice > 0 || maxPrice < 200000;

  return (
    <>
      {/* Floating Bottom-Right Search Button */}
      <div className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-black hover:bg-zinc-800 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 active:scale-95 border border-zinc-700/50 cursor-pointer"
          aria-label="Open Search and Filter"
        >
          {/* Animated pulse ring */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
          </span>

          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Search className="w-4 h-4 text-white" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-black tracking-wide uppercase">Search</span>
            <span className="text-[10px] text-zinc-300 font-medium">Filter Cycles</span>
          </div>

          {hasActiveFilters && (
            <span className="ml-1 w-2 h-2 rounded-full bg-cyan-400" title="Filters active" />
          )}
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          {/* Background dismiss */}
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative z-10 bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-sm">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-lg sm:text-xl text-black">
                    Search & Filter Cycles
                  </h2>
                  <p className="text-xs text-zinc-500 font-normal">
                    Find the perfect ride by price range and cycle type
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-600 hover:text-black hover:bg-zinc-200/70 transition-all border border-zinc-200"
                    title="Reset all filters"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content (Search + Filters + Product Results) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* 1. Main Search Bar */}
              <div className="relative">
                <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type cycle name, model (e.g., Kona, Aero, Turbo, TrailBlazer)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-50 hover:bg-zinc-100/80 focus:bg-white border-2 border-zinc-200 focus:border-black rounded-2xl pl-12 pr-10 py-3.5 text-sm sm:text-base text-black placeholder:text-zinc-400 focus:outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* 2. Filter Section (Collapsible & Expandable on Click) */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl overflow-hidden transition-all duration-300">
                {/* Clickable Filter Header Bar */}
                <button
                  type="button"
                  onClick={() => setIsFiltersExpanded((prev) => !prev)}
                  className="w-full p-4 sm:p-4.5 flex items-center justify-between text-left hover:bg-zinc-100/70 transition-colors cursor-pointer"
                  aria-expanded={isFiltersExpanded}
                  title={isFiltersExpanded ? "Click to minimize filter options" : "Click to expand filter options"}
                >
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shadow-xs">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-black">
                      Filter Options
                    </span>

                    {/* Summary chips visible when minimized */}
                    {!isFiltersExpanded && (
                      <div className="flex items-center gap-1.5 ml-1">
                        <span className="text-[10px] font-bold bg-white text-zinc-800 border border-zinc-200 px-2 py-0.5 rounded-md">
                          ₹{minPrice.toLocaleString('en-IN')} - ₹{maxPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded-md">
                          {cycleTypes.find((t) => t.id === selectedType)?.label || 'All Cycles'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500 font-semibold hidden sm:inline">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'cycle' : 'cycles'}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-zinc-700 bg-white border border-zinc-200 px-2.5 py-1 rounded-xl shadow-2xs">
                      <span>{isFiltersExpanded ? 'Minimize' : 'Expand'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isFiltersExpanded ? 'rotate-180 text-black' : 'text-zinc-500'
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Collapsible Filter Body */}
                {isFiltersExpanded && (
                  <div className="px-4 pb-5 sm:px-5 space-y-5 border-t border-zinc-200/60 pt-4 animate-fadeIn">
                    {/* Filter 1: Price in Range */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-black uppercase tracking-wide">
                          1. Price in Range
                        </label>
                        <span className="text-xs sm:text-sm font-black text-black bg-white px-3 py-1 rounded-lg border border-zinc-200 shadow-xs">
                          ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Range Slider */}
                      <div className="space-y-1 pt-1">
                        <input
                          type="range"
                          min="5000"
                          max="200000"
                          step="5000"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                        <div className="flex justify-between text-[10px] text-zinc-400 font-semibold px-0.5">
                          <span>₹5,000</span>
                          <span>₹50,000</span>
                          <span>₹1,00,000</span>
                          <span>₹1,50,000</span>
                          <span>₹2,00,000</span>
                        </div>
                      </div>

                      {/* Price Presets */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {pricePresets.map((preset) => {
                          const isActive = minPrice === preset.min && maxPrice === preset.max;
                          return (
                            <button
                              key={preset.label}
                              onClick={() => {
                                setMinPrice(preset.min);
                                setMaxPrice(preset.max);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-black text-white shadow-xs'
                                  : 'bg-white text-zinc-600 hover:text-black hover:bg-zinc-100 border border-zinc-200'
                              }`}
                            >
                              {preset.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-zinc-200/80" />

                    {/* Filter 2: Cycle Type */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-black uppercase tracking-wide block">
                        2. Cycle Type
                      </label>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {cycleTypes.map((type) => {
                          const isSelected = selectedType === type.id;
                          return (
                            <button
                              key={type.id}
                              onClick={() => setSelectedType(type.id)}
                              className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between border cursor-pointer ${
                                isSelected
                                  ? 'bg-black text-white border-black shadow-md'
                                  : 'bg-white text-zinc-800 hover:bg-zinc-100 border-zinc-200 hover:border-zinc-300'
                              }`}
                            >
                              <span className="text-xs font-black tracking-tight">{type.label}</span>
                              {type.desc && (
                                <span className={`text-[10px] mt-1 font-medium ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                  {type.desc}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Products Results Section */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-black text-base text-black uppercase tracking-wide">
                    Matching Cycles ({filteredProducts.length})
                  </h3>
                  {filteredProducts.length > 0 && (
                    <a
                      href="#cycles"
                      onClick={() => setIsOpen(false)}
                      className="text-xs font-bold text-zinc-600 hover:text-black flex items-center gap-1 transition-colors"
                    >
                      <span>Explore in Store Fleet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 space-y-3">
                    <Search className="w-10 h-10 text-zinc-300 mx-auto" />
                    <h4 className="font-heading font-bold text-base text-zinc-800">
                      No matching cycles found
                    </h4>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                      No cycles match your selected price range or type. Try expanding the price slider or resetting filters.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-2 btn-secondary py-2 px-4 text-xs rounded-xl inline-flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((bike) => (
                      <div
                        key={bike.id}
                        className="bg-white border border-zinc-200 hover:border-zinc-400 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                      >
                        <div>
                          {/* Image & Badge */}
                          <div className="relative h-44 rounded-xl bg-zinc-50 overflow-hidden mb-3 border border-zinc-100 flex items-center justify-center p-2">
                            <div className="absolute top-2 left-2 badge-neon bg-black text-white text-[10px] py-0.5 px-2">
                              {bike.badge || 'Featured'}
                            </div>

                            <div className="absolute top-2 right-2 flex items-center gap-1 text-[11px] font-bold text-black bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-zinc-200">
                              <Star className="w-3 h-3 fill-black text-black" />
                              <span>{bike.rating}</span>
                            </div>

                            <img
                              src={bike.image}
                              alt={bike.name}
                              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Cycle Type Tags */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {bike.cycleTypes?.map((t) => (
                              <span
                                key={t}
                                className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200"
                              >
                                {t === 'kids' ? 'Kids Cycle' : t === 'ranger' ? 'Ranger Cycle' : t === 'gear' ? 'Gear Cycle' : 'Racing Cycle'}
                              </span>
                            ))}
                          </div>

                          {/* Title & Subtitle */}
                          <h4 className="font-heading font-black text-sm sm:text-base text-black group-hover:text-zinc-700 transition-colors line-clamp-1">
                            {bike.name}
                          </h4>
                          <p className="text-zinc-500 text-xs line-clamp-1 font-normal mt-0.5">
                            {bike.subtitle}
                          </p>
                        </div>

                        {/* Price & Actions */}
                        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                          <div>
                            {bike.originalPrice && (
                              <span className="text-[10px] text-zinc-400 line-through block leading-none">
                                ₹{bike.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                            <span className="font-heading font-black text-base sm:text-lg text-black">
                              ₹{bike.price.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                onSelectBike(bike);
                              }}
                              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-black transition-all flex items-center justify-center cursor-pointer"
                              title="View Specifications"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                onAddToCart(bike);
                              }}
                              className="btn-primary py-2 px-3 text-xs rounded-xl flex items-center gap-1.5"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Add</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs text-zinc-500">
              <span className="hidden sm:inline">
                Press <kbd className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded font-mono text-[10px] text-black">ESC</kbd> to close
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-secondary py-2 px-4 text-xs rounded-xl ml-auto"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
