"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ShoppingCart, Filter, X } from 'lucide-react';
import { cakes } from '@/lib/data';
import { useStore } from '@/lib/store';

export default function CatalogPage() {
  const addToCart = useStore((state) => state.addToCart);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedDietary, setSelectedDietary] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const flavors = ['All', ...Array.from(new Set(cakes.map(c => c.flavor)))];
  const occasions = ['All', ...Array.from(new Set(cakes.map(c => c.occasion)))];
  const dietaryOptions = ['All', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Contains Nuts'];

  const filteredAndSortedCakes = useMemo(() => {
    let filtered = cakes.filter(cake => {
      const flavorMatch = selectedFlavor === 'All' || cake.flavor === selectedFlavor;
      const occasionMatch = selectedOccasion === 'All' || cake.occasion === selectedOccasion;
      const dietaryMatch = selectedDietary === 'All' || cake.dietaryInfo.includes(selectedDietary);
      const priceMatch = cake.price >= priceRange[0] && cake.price <= priceRange[1];
      
      return flavorMatch && occasionMatch && dietaryMatch && priceMatch;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // popular
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [selectedFlavor, selectedOccasion, selectedDietary, priceRange, sortBy]);

  const handleQuickAdd = (cake: typeof cakes[0]) => {
    addToCart({
      cake,
      quantity: 1,
      selectedSize: cake.sizes[0].size,
      selectedFrosting: cake.frostingOptions[0],
    });
  };

  const clearFilters = () => {
    setSelectedFlavor('All');
    setSelectedOccasion('All');
    setSelectedDietary('All');
    setPriceRange([0, 150]);
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-gradient">
            Our Cake Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our delicious selection of handcrafted cakes. Filter by flavor, occasion, or dietary preferences.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:col-span-1 mb-8 lg:mb-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-pastel-purple hover:underline focus:outline-none focus:ring-2 focus:ring-pastel-purple rounded"
                >
                  Clear All
                </button>
              </div>

              {/* Flavor Filter */}
              <div className="mb-6">
                <label className="label">Flavor</label>
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="input-field"
                  aria-label="Filter by flavor"
                >
                  {flavors.map(flavor => (
                    <option key={flavor} value={flavor}>{flavor}</option>
                  ))}
                </select>
              </div>

              {/* Occasion Filter */}
              <div className="mb-6">
                <label className="label">Occasion</label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="input-field"
                  aria-label="Filter by occasion"
                >
                  {occasions.map(occasion => (
                    <option key={occasion} value={occasion}>{occasion}</option>
                  ))}
                </select>
              </div>

              {/* Dietary Filter */}
              <div className="mb-6">
                <label className="label">Dietary Restrictions</label>
                <select
                  value={selectedDietary}
                  onChange={(e) => setSelectedDietary(e.target.value)}
                  className="input-field"
                  aria-label="Filter by dietary restrictions"
                >
                  {dietaryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="label">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                  aria-label="Maximum price filter"
                />
              </div>

              {/* Active Filters */}
              {(selectedFlavor !== 'All' || selectedOccasion !== 'All' || selectedDietary !== 'All') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold mb-3">Active Filters:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFlavor !== 'All' && (
                      <span className="px-3 py-1 bg-pastel-pink/30 rounded-full text-sm flex items-center gap-2">
                        {selectedFlavor}
                        <button
                          onClick={() => setSelectedFlavor('All')}
                          className="hover:text-red-500"
                          aria-label={`Remove ${selectedFlavor} filter`}
                        >
                          <X className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </span>
                    )}
                    {selectedOccasion !== 'All' && (
                      <span className="px-3 py-1 bg-pastel-blue/30 rounded-full text-sm flex items-center gap-2">
                        {selectedOccasion}
                        <button
                          onClick={() => setSelectedOccasion('All')}
                          className="hover:text-red-500"
                          aria-label={`Remove ${selectedOccasion} filter`}
                        >
                          <X className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </span>
                    )}
                    {selectedDietary !== 'All' && (
                      <span className="px-3 py-1 bg-pastel-purple/30 rounded-full text-sm flex items-center gap-2">
                        {selectedDietary}
                        <button
                          onClick={() => setSelectedDietary('All')}
                          className="hover:text-red-500"
                          aria-label={`Remove ${selectedDietary} filter`}
                        >
                          <X className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-secondary flex items-center gap-2"
                >
                  <Filter className="w-5 h-5" aria-hidden="true" />
                  Filters
                </button>
                <p className="text-gray-600">
                  <span className="font-semibold">{filteredAndSortedCakes.length}</span> cakes found
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-semibold text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pastel-purple focus:outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Cakes Grid */}
            {filteredAndSortedCakes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedCakes.map((cake, index) => (
                  <motion.article
                    key={cake.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="card group"
                  >
                    <Link href={`/catalog/${cake.id}`} className="block">
                      {/* Image */}
                      <div className="relative h-56 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 flex items-center justify-center overflow-hidden">
                        <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                          {cake.images[0]}
                        </div>
                        {/* Badges */}
                        {(cake.dietaryInfo.includes('Vegan') || cake.dietaryInfo.includes('Gluten-Free')) && (
                          <div className="absolute top-3 right-3">
                            {cake.dietaryInfo.includes('Vegan') && (
                              <div className="bg-pastel-mint text-gray-800 px-2 py-1 rounded-full text-xs font-semibold mb-1">
                                Vegan
                              </div>
                            )}
                            {cake.dietaryInfo.includes('Gluten-Free') && (
                              <div className="bg-pastel-yellow text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                                GF
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold group-hover:text-pastel-purple transition-colors line-clamp-1">
                            {cake.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm flex-shrink-0 ml-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                            <span className="font-semibold">{cake.rating}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {cake.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="px-2 py-0.5 bg-pastel-pink/30 rounded-full text-xs">
                            {cake.flavor}
                          </span>
                          <span className="px-2 py-0.5 bg-pastel-blue/30 rounded-full text-xs">
                            {cake.occasion}
                          </span>
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xl font-bold text-gradient">
                              ${cake.price}
                            </div>
                            <div className="text-xs text-gray-500">from</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleQuickAdd(cake);
                            }}
                            className="p-2.5 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pastel-purple focus:ring-offset-2"
                            aria-label={`Add ${cake.name} to cart`}
                          >
                            <ShoppingCart className="w-5 h-5 text-gray-800" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-semibold mb-2">No cakes found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
