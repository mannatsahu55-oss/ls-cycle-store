import React, { useState } from 'react';
import { ShoppingBag, Star, Search } from 'lucide-react';
import { PARTS_DATA } from '../data/mockData';

export default function SparePartsSection({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Tires', 'Drivetrain', 'Brakes', 'Pedals', 'Accessories', 'Maintenance', 'Apparel'];

  const filteredParts = PARTS_DATA.filter((part) => {
    const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;
    const matchesSearch =
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'low-to-high') return a.price - b.price;
    if (sortBy === 'high-to-low') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="parts" className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="section-tag">
            <span>Genuine Spare Parts Catalog</span>
          </div>
          <h2 className="section-heading text-black">
            HIGH-GRADE <span className="gradient-text">COMPONENTS</span>
          </h2>
          <p className="section-subtext mx-auto">
            Upgrade your ride with original factory replacement components, hydraulic brake kits, performance tires, and titanium chains.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl mb-10 border-zinc-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories Horizontal */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-md'
                    : 'bg-zinc-100 text-zinc-700 hover:text-black border border-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl pl-9 pr-3 py-2 text-xs text-black focus:outline-none transition-all"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-3 py-2 text-xs text-black focus:outline-none cursor-pointer transition-all"
            >
              <option value="featured">Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="glass-panel-interactive rounded-2xl p-4 border-zinc-200 bg-white shadow-sm flex flex-col justify-between group"
            >
              <div>
                {/* Part Image */}
                <div className="relative h-44 rounded-xl bg-zinc-50 overflow-hidden mb-4 border border-zinc-200 flex items-center justify-center p-3">
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded bg-black text-white z-10">
                    {part.category}
                  </span>
                  
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[11px] font-bold text-black glass-panel px-2 py-0.5 rounded-full border-zinc-200 z-10">
                    <Star className="w-3 h-3 fill-black text-black" />
                    <span>{part.rating}</span>
                  </div>

                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-heading font-bold text-sm text-black group-hover:text-zinc-700 transition-colors line-clamp-1">
                  {part.name}
                </h3>
                <p className="text-zinc-600 text-[11px] mt-1 line-clamp-2 font-normal">
                  {part.description}
                </p>
              </div>

              {/* Price & Add button */}
              <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold block">In Stock</span>
                  <span className="font-heading font-bold text-lg text-black">
                    ₹{part.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart(part)}
                  className="btn-primary py-2 px-3 text-xs rounded-xl flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
