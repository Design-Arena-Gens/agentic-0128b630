"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['(123) 456-7890', 'Mon-Fri: 9am-6pm'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@sweetdelights.com', 'We reply within 24 hours'],
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Bakery Lane', 'Sweet City, SC 12345'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 8am-7pm', 'Sat-Sun: 9am-5pm'],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 py-20 mb-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6 text-gradient">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-700">
              Have a question or want to order a custom cake? We&apos;d love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pastel-pink to-pastel-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-3">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600">
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
            
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center gap-3"
              >
                <div className="text-2xl">✅</div>
                <div>
                  <p className="font-semibold">Message sent successfully!</p>
                  <p className="text-sm">We&apos;ll get back to you within 24 hours.</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Name *</label>
                  <input
                    {...register('name')}
                    className="input-field"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Phone *</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="input-field"
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="label">Email *</label>
                <input
                  {...register('email')}
                  type="email"
                  className="input-field"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="label">Subject *</label>
                <input
                  {...register('subject')}
                  className="input-field"
                  placeholder="Custom birthday cake inquiry"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="label">Message *</label>
                <textarea
                  {...register('message')}
                  className="input-field min-h-[150px] resize-y"
                  placeholder="Tell us about your cake needs..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="card overflow-hidden"
          >
            <div className="h-full min-h-[500px] bg-gradient-to-br from-pastel-blue/30 to-pastel-purple/30 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-8xl mb-6">🗺️</div>
                <h3 className="text-2xl font-bold mb-4">Visit Our Bakery</h3>
                <p className="text-gray-700 mb-6">
                  Come visit us in person! We&apos;re located in the heart of Sweet City.
                </p>
                <div className="space-y-3 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-pastel-purple flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">123 Bakery Lane, Sweet City, SC 12345</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-pastel-purple flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">Open Monday-Sunday, 8am-7pm</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'How far in advance should I order?',
                a: 'We recommend ordering at least 3-5 days in advance for custom cakes. For standard cakes, 24-48 hours notice is preferred.',
              },
              {
                q: 'Do you offer delivery?',
                a: 'Yes! We offer local delivery within a 25-mile radius. Free delivery on orders over $75.',
              },
              {
                q: 'Can I customize any cake?',
                a: 'Absolutely! All our cakes can be customized with your choice of flavors, frostings, and decorations.',
              },
              {
                q: 'What are your dietary options?',
                a: 'We offer vegan, gluten-free, and nut-free options. Please specify your requirements when ordering.',
              },
            ].map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
