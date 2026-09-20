import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Search } from 'lucide-react';
import { CYCLES_DATA } from '../data/mockData';

export default function CycleSales({ onAddToCart, onSelectBike }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Mountain (MTB)', 'Road Aero', 'Electric (E-Bike)', 'Gravel / Urban'];

  const filteredBikes = CYCLES_DATA.filter((bike) => {
    const matchesCategory = selectedCategory === 'All' || bike.category === selectedCategory;
    const matchesSearch =
      bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="cycles" className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="section-tag">
            <span>Lakshmi Srinivasa Fleet</span>
          </div>
          <h2 className="section-heading text-black">
            HIGH PERFORMANCE <span className="gradient-text">CYCLES FLEET</span>
          </h2>
          <p className="section-subtext mx-auto">
            Hand-assembled, precision tuned mountain, road, and electric bicycles designed for competitive performance and supreme comfort.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="glass-panel p-4 rounded-2xl mb-12 border-zinc-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-md'
                    : 'bg-zinc-100 text-zinc-700 hover:text-black hover:bg-zinc-200 border border-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search bicycle models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl pl-9 pr-4 py-2 text-xs text-black focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Bicycle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBikes.map((bike) => (
            <div
              key={bike.id}
              className="glass-panel-interactive rounded-3xl p-5 border-zinc-200 bg-white flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative h-64 rounded-2xl bg-zinc-50 overflow-hidden mb-5 border border-zinc-200/80 flex items-center justify-center p-4">
                  <div className="absolute top-3 left-3 badge-neon bg-black text-white border-black z-10">
                    {bike.badge}
                  </div>
                  
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold text-black glass-panel px-2.5 py-1 rounded-full border-zinc-200 z-10">
                    <Star className="w-3.5 h-3.5 fill-black text-black" />
                    <span>{bike.rating}</span>
                  </div>

                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Quick View Hover Overlay Button */}
                  <button
                    onClick={() => onSelectBike(bike)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-bold text-white z-20"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Specifications</span>
                  </button>
                </div>

                {/* Info Header */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                    {bike.category}
                  </div>
                  <h3 className="font-heading font-black text-xl text-black group-hover:text-zinc-700 transition-colors">
                    {bike.name}
                  </h3>
                  <p className="text-zinc-600 text-xs line-clamp-2 font-normal leading-relaxed">
                    {bike.subtitle}
                  </p>
                </div>

                {/* Specs Pill List */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap gap-2">
                  <span className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                    Frame: {bike.specs?.frame?.split(' ')[0] || 'Alloy'}
                  </span>
                  <span className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                    Brakes: {bike.specs?.brakes?.split(' ')[0] || 'Disc'}
                  </span>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center justify-between sm:block">
                  <div>
                    <span className="text-[10px] text-zinc-500 line-through block">
                      ₹{bike.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="font-heading font-black text-2xl text-black">
                      ₹{bike.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* On mobile, place Quick View eye button adjacent to the price in top row */}
                  <button
                    onClick={() => onSelectBike(bike)}
                    className="sm:hidden p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-black hover:bg-zinc-200 transition-all flex items-center gap-1.5 text-xs font-semibold"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* On tablet/desktop, keep Quick View eye button here */}
                  <button
                    onClick={() => onSelectBike(bike)}
                    className="hidden sm:flex p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-black hover:bg-zinc-200 transition-all items-center justify-center"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAddToCart(bike)}
                    className="btn-primary w-full sm:w-auto py-2.5 px-4 text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="whitespace-nowrap">Add to Cart</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
