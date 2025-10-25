"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Package, Mail } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen py-20 flex items-center justify-center">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
          >
            <Check className="w-12 h-12 text-white" aria-hidden="true" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Order Confirmed! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your order! We&apos;re preparing your delicious cakes with love.
            </p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-8 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-pastel-blue/30 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-pastel-purple" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-600 text-sm">Order Number</h3>
                    <p className="text-xl font-bold">ORD-{Date.now().toString().slice(-6)}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-semibold">Estimated Delivery:</span> 2-3 business days</p>
                  <p><span className="font-semibold">Status:</span> Processing</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-pastel-pink/30 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-pastel-purple" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-600 text-sm">Confirmation Email</h3>
                    <p className="text-lg font-bold">Sent to your inbox</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  We&apos;ve sent order details and tracking information to your email address.
                </p>
              </div>
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card p-8 mb-8 bg-gradient-to-br from-pastel-pink/20 to-pastel-purple/20"
          >
            <h2 className="text-2xl font-bold mb-4">What happens next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-semibold mb-2">1. We Prepare</h3>
                <p className="text-sm text-gray-600">
                  Our bakers start crafting your cakes with premium ingredients
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">🚚</div>
                <h3 className="font-semibold mb-2">2. We Ship</h3>
                <p className="text-sm text-gray-600">
                  Your order is carefully packaged and shipped to your door
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">🎂</div>
                <h3 className="font-semibold mb-2">3. You Enjoy</h3>
                <p className="text-sm text-gray-600">
                  Receive your delicious cakes and celebrate your special moment
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/account" className="btn-primary">
              View Order Status
            </Link>
            <Link href="/catalog" className="btn-secondary">
              Continue Shopping
            </Link>
          </motion.div>

          {/* Support */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-gray-600 mt-8"
          >
            Questions? Contact us at{' '}
            <a href="mailto:support@sweetdelights.com" className="text-pastel-purple hover:underline font-semibold">
              support@sweetdelights.com
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
