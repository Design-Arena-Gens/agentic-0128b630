"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { cakes } from '@/lib/data';
import { useStore } from '@/lib/store';
import Link from 'next/link';

export default function CakeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const addToCart = useStore((state) => state.addToCart);
  
  const cake = cakes.find(c => c.id === params.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFrosting, setSelectedFrosting] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (cake) {
      setSelectedSize(cake.sizes[0].size);
      setSelectedFrosting(cake.frostingOptions[0]);
    }
  }, [cake]);

  if (!cake) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold mb-4">Cake Not Found</h1>
          <Link href="/catalog" className="btn-primary">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const selectedPrice = cake.sizes.find(s => s.size === selectedSize)?.price || cake.price;
  const relatedCakes = cakes.filter(c => c.id !== cake.id && (c.flavor === cake.flavor || c.category === cake.category)).slice(0, 3);

  const handleAddToCart = () => {
    addToCart({
      cake,
      quantity,
      selectedSize,
      selectedFrosting,
      customMessage: customMessage || undefined,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % cake.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + cake.images.length) % cake.images.length);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-pastel-purple">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/catalog" className="text-gray-600 hover:text-pastel-purple">Catalog</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-800 font-semibold">{cake.name}</li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 rounded-2xl overflow-hidden flex items-center justify-center mb-4">
                <div className="text-[200px]">
                  {cake.images[currentImageIndex]}
                </div>
                
                {/* Navigation Arrows */}
                {cake.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {cake.images.length > 1 && (
                <div className="flex gap-3 justify-center">
                  {cake.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden transition-all ${
                        index === currentImageIndex
                          ? 'ring-4 ring-pastel-purple scale-110'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 flex items-center justify-center text-4xl">
                        {img}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">{cake.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(cake.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{cake.rating}</span>
              <span className="text-gray-500">({cake.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-4xl font-bold text-gradient mb-2">
                ${selectedPrice}
              </div>
              <p className="text-gray-600">Free delivery on orders over $75</p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-6">{cake.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {cake.dietaryInfo.map((info) => (
                <span
                  key={info}
                  className="px-4 py-2 bg-gradient-to-r from-pastel-pink/30 to-pastel-purple/30 rounded-full text-sm font-semibold"
                >
                  {info}
                </span>
              ))}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="label">Select Size</label>
              <div className="grid grid-cols-1 gap-3">
                {cake.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedSize === size.size
                        ? 'border-pastel-purple bg-pastel-purple/10'
                        : 'border-gray-200 hover:border-pastel-purple/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{size.size}</span>
                      <span className="text-lg font-bold text-gradient">${size.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Frosting Selection */}
            <div className="mb-6">
              <label className="label">Frosting Option</label>
              <select
                value={selectedFrosting}
                onChange={(e) => setSelectedFrosting(e.target.value)}
                className="input-field"
              >
                {cake.frostingOptions.map((frosting) => (
                  <option key={frosting} value={frosting}>
                    {frosting}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Message */}
            <div className="mb-6">
              <label className="label">Custom Message (Optional)</label>
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="e.g., Happy Birthday Sarah!"
                className="input-field"
                maxLength={50}
              />
              <p className="text-sm text-gray-500 mt-1">
                {customMessage.length}/50 characters
              </p>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="label">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-pastel-purple transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-pastel-purple transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" aria-hidden="true" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                className="w-14 h-14 rounded-full border-2 border-pastel-purple hover:bg-pastel-purple/10 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                aria-label="Add to wishlist"
              >
                <Heart className="w-6 h-6 text-pastel-purple" aria-hidden="true" />
              </button>
              <button
                className="w-14 h-14 rounded-full border-2 border-pastel-purple hover:bg-pastel-purple/10 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                aria-label="Share"
              >
                <Share2 className="w-6 h-6 text-pastel-purple" aria-hidden="true" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-pastel-pink/20 to-pastel-purple/20 rounded-2xl p-6">
              <h3 className="font-semibold mb-3">What&apos;s Included:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" aria-hidden="true" />
                  <span>Handcrafted with premium ingredients</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" aria-hidden="true" />
                  <span>Beautiful presentation ready for your event</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" aria-hidden="true" />
                  <span>Custom message option included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" aria-hidden="true" />
                  <span>Secure packaging for safe delivery</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related Cakes */}
        {relatedCakes.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-gradient">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCakes.map((relatedCake) => (
                <Link key={relatedCake.id} href={`/catalog/${relatedCake.id}`} className="card group">
                  <div className="relative h-56 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 flex items-center justify-center">
                    <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                      {relatedCake.images[0]}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-pastel-purple transition-colors">
                      {relatedCake.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gradient">
                        ${relatedCake.price}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                        <span className="font-semibold">{relatedCake.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
