"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Heart, Award, Truck } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import FeaturedCakes from "@/components/home/FeaturedCakes";

export default function HomePage() {
  const features = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every cake is crafted with premium ingredients and care",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in taste and design",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery available in select areas",
    },
    {
      icon: ShoppingBag,
      title: "Custom Orders",
      description: "Personalize your cake for any special occasion",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-pastel-pink/20 to-pastel-purple/20 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-md">
                  <feature.icon className="w-8 h-8 text-pastel-purple" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Cakes */}
      <FeaturedCakes />

      {/* About Section */}
      <section className="py-16 bg-gradient-to-br from-pastel-blue/20 to-pastel-mint/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gradient">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                For over 20 years, Sweet Delights Bakery has been creating memorable moments
                through exceptional cakes. Our master bakers combine traditional techniques
                with modern designs to bring your sweet dreams to life.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We use only the finest ingredients, sourced locally whenever possible,
                to ensure every bite is a taste of perfection. From birthdays to weddings,
                we&apos;re honored to be part of your special celebrations.
              </p>
              <Link href="/catalog" className="btn-primary inline-block">
                Explore Our Cakes
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎂</div>
                  <p className="text-2xl font-semibold text-gray-800">Crafting Sweet Memories</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pastel-pink to-pastel-purple">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Create Something Sweet?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Browse our collection or contact us for a custom cake designed just for you
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
