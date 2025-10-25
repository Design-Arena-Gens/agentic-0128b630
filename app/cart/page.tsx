"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const getCartTotal = useStore((state) => state.getCartTotal);

  const subtotal = getCartTotal();
  const shipping = subtotal > 75 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Add some delicious cakes to get started!
            </p>
            <Link href="/catalog" className="btn-primary inline-block">
              Browse Cakes
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-gradient"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item, index) => {
                const itemPrice = item.cake.sizes.find(s => s.size === item.selectedSize)?.price || item.cake.price;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <motion.div
                    key={`${item.cake.id}-${item.selectedSize}-${item.selectedFrosting}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex gap-6">
                      {/* Image */}
                      <Link
                        href={`/catalog/${item.cake.id}`}
                        className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        <div className="text-6xl">{item.cake.images[0]}</div>
                      </Link>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link
                              href={`/catalog/${item.cake.id}`}
                              className="text-xl font-semibold hover:text-pastel-purple transition-colors"
                            >
                              {item.cake.name}
                            </Link>
                            <div className="text-sm text-gray-600 space-y-1 mt-2">
                              <div><span className="font-medium">Size:</span> {item.selectedSize}</div>
                              <div><span className="font-medium">Frosting:</span> {item.selectedFrosting}</div>
                              {item.customMessage && (
                                <div><span className="font-medium">Message:</span> &quot;{item.customMessage}&quot;</div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gradient mb-2">
                              ${itemTotal.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              ${itemPrice} each
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.cake.id, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-pastel-purple transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <span className="text-lg font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cake.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-pastel-purple transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cake.id)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-3 py-2"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                            <span className="text-sm font-medium">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-pastel-purple hover:underline font-semibold"
              >
                <ArrowRight className="w-5 h-5 rotate-180" aria-hidden="true" />
                Continue Shopping
              </Link>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {subtotal > 0 && subtotal < 75 && (
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Tax (8%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-bold text-gradient">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-primary w-full flex items-center justify-center gap-2 mb-4"
              >
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                Proceed to Checkout
              </Link>

              <div className="text-center text-sm text-gray-600">
                <p>Secure checkout powered by Stripe</p>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      ✓
                    </div>
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      ✓
                    </div>
                    <span>Free delivery over $75</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      ✓
                    </div>
                    <span>100% satisfaction guarantee</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
