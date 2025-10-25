"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, Heart, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every cake is handcrafted with passion and care by our expert bakers.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only the finest ingredients sourced from trusted suppliers.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond for every order.',
    },
    {
      icon: Sparkles,
      title: 'Creative Excellence',
      description: 'From classic to custom, we bring your sweetest dreams to life.',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6 text-gradient">
              Our Story
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              For over 20 years, Sweet Delights Bakery has been bringing joy to celebrations
              across the country with our handcrafted, artisanal cakes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">The Beginning</h2>
              <p className="text-lg text-gray-700 mb-4">
                It all started in a small kitchen in 2004, where our founder, Maria Sweet,
                began baking cakes for friends and family. Her passion for creating beautiful
                and delicious desserts quickly turned into a beloved local business.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                What began as a hobby grew into Sweet Delights Bakery, now serving thousands
                of happy customers and creating memorable moments for every celebration.
              </p>
              <p className="text-lg text-gray-700">
                Today, we continue Maria&apos;s legacy of excellence, combining traditional baking
                techniques with modern flavors and designs to create cakes that are truly special.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl mb-4">👩‍🍳</div>
                  <p className="text-2xl font-semibold text-gray-800">Crafting Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-pastel-blue/20 to-pastel-mint/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pastel-pink to-pastel-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '20+', label: 'Years of Excellence' },
              { number: '10,000+', label: 'Happy Customers' },
              { number: '50+', label: 'Cake Varieties' },
              { number: '100%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pastel-pink to-pastel-purple">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Order Your Perfect Cake?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Browse our collection or contact us for a custom creation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalog" className="bg-white text-gray-800 font-semibold py-4 px-8 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                Browse Cakes
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
