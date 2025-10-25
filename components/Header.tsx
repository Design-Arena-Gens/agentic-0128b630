"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Cake } from 'lucide-react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const isAdmin = useStore((state) => state.isAdmin);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <nav className="container-custom py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-pastel-pink to-pastel-purple rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Cake className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-gradient">
              Sweet Delights
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-pastel-purple font-semibold transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* User Menu */}
            <Link
              href={user ? '/account' : '/login'}
              className="flex items-center gap-2 text-gray-700 hover:text-pastel-purple transition-colors duration-200"
              aria-label={user ? 'Account' : 'Login'}
            >
              <User className="w-6 h-6" aria-hidden="true" />
              <span className="hidden sm:inline font-semibold">
                {user ? user.name : 'Login'}
              </span>
            </Link>

            {/* Admin Link */}
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden md:inline-block px-4 py-2 bg-pastel-purple/20 rounded-full text-sm font-semibold hover:bg-pastel-purple/30 transition-colors duration-200"
              >
                Admin
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-pastel-purple transition-colors duration-200"
              aria-label={`Shopping cart with ${cartItemsCount} items`}
            >
              <ShoppingCart className="w-6 h-6" aria-hidden="true" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-full flex items-center justify-center text-xs font-bold text-gray-800"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-pastel-purple font-semibold transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-pastel-purple font-semibold py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
