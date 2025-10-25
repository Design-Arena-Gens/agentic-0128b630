"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { cakes } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function FeaturedCakes() {
  const addToCart = useStore((state) => state.addToCart);
  const featuredCakes = cakes.slice(0, 6);

  const handleQuickAdd = (cake: typeof cakes[0]) => {
    addToCart({
      cake,
      quantity: 1,
      selectedSize: cake.sizes[0].size,
      selectedFrosting: cake.frostingOptions[0],
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-pastel-purple/10 to-pastel-blue/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Featured Cakes
          </h2>
          <p className="text-xl text-gray-600">
            Discover our most popular and loved creations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCakes.map((cake, index) => (
            <motion.article
              key={cake.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group"
            >
              <Link href={`/catalog/${cake.id}`} className="block">
                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {cake.images[0]}
                  </div>
                  {/* Badge */}
                  {cake.dietaryInfo.includes('Vegan') && (
                    <div className="absolute top-4 right-4 bg-pastel-mint text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                      Vegan
                    </div>
                  )}
                  {cake.dietaryInfo.includes('Gluten-Free') && (
                    <div className="absolute top-4 right-4 bg-pastel-yellow text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                      Gluten-Free
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-pastel-purple transition-colors">
                      {cake.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      <span className="font-semibold">{cake.rating}</span>
                      <span className="text-gray-500">({cake.reviews})</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {cake.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-pastel-pink/30 rounded-full text-xs font-medium">
                      {cake.flavor}
                    </span>
                    <span className="px-2 py-1 bg-pastel-blue/30 rounded-full text-xs font-medium">
                      {cake.occasion}
                    </span>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gradient">
                        ${cake.price}
                      </div>
                      <div className="text-xs text-gray-500">Starting from</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuickAdd(cake);
                      }}
                      className="p-3 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pastel-purple focus:ring-offset-2"
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/catalog" className="btn-primary inline-block">
            View All Cakes
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
