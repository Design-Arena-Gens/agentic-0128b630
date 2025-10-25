"use client";

import Link from 'next/link';
import { Cake, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Cakes', href: '/catalog' },
      { name: 'Birthday Cakes', href: '/catalog?occasion=Birthday' },
      { name: 'Wedding Cakes', href: '/catalog?occasion=Wedding' },
      { name: 'Custom Orders', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Careers', href: '/careers' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Shipping Policy', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-pastel-pink/20 via-pastel-purple/20 to-pastel-blue/20 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pastel-pink to-pastel-purple rounded-full flex items-center justify-center">
                <Cake className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-gradient">
                Sweet Delights
              </span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Creating sweet memories since 2004. We craft premium custom cakes for every special occasion.
            </p>
            <div className="space-y-2">
              <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-700 hover:text-pastel-purple transition-colors">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>(123) 456-7890</span>
              </a>
              <a href="mailto:info@sweetdelights.com" className="flex items-center gap-2 text-gray-700 hover:text-pastel-purple transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>info@sweetdelights.com</span>
              </a>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>123 Bakery Lane, Sweet City, SC 12345</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pastel-purple transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pastel-purple transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pastel-purple transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Sweet Delights Bakery. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-pastel-purple/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-gray-700" aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-pastel-purple/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-gray-700" aria-hidden="true" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-pastel-purple/20 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-gray-700" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
