"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, MapPin, Check } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Valid card number is required'),
  cardName: z.string().min(2, 'Cardholder name is required'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Format: MM/YY'),
  cvv: z.string().min(3, 'CVV is required'),
});

type AddressFormData = z.infer<typeof addressSchema>;
type PaymentFormData = z.infer<typeof paymentSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const getCartTotal = useStore((state) => state.getCartTotal);
  const clearCart = useStore((state) => state.clearCart);
  const user = useStore((state) => state.user);

  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [addressData, setAddressData] = useState<AddressFormData | null>(null);

  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: user?.addresses[0] || {},
  });

  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const subtotal = getCartTotal();
  const shippingCost = shippingMethod === 'express' ? 25 : shippingMethod === 'overnight' ? 50 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const onAddressSubmit = (data: AddressFormData) => {
    setAddressData(data);
    setStep(2);
  };

  const onPaymentSubmit = async (data: PaymentFormData) => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    router.push('/order-confirmation');
  };

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const steps = [
    { number: 1, name: 'Shipping', icon: MapPin },
    { number: 2, name: 'Payment', icon: CreditCard },
    { number: 3, name: 'Review', icon: Check },
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-pastel-pink/10 to-pastel-blue/10">
      <div className="container-custom">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-gradient text-center"
        >
          Secure Checkout
        </motion.h1>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step >= s.number
                        ? 'bg-gradient-to-r from-pastel-pink to-pastel-purple text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <s.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold text-center">{s.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      step > s.number ? 'bg-gradient-to-r from-pastel-pink to-pastel-purple' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Truck className="w-7 h-7 text-pastel-purple" aria-hidden="true" />
                  Shipping Information
                </h2>

                <form onSubmit={handleAddressSubmit(onAddressSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Full Name *</label>
                      <input
                        {...registerAddress('fullName')}
                        className="input-field"
                        placeholder="John Doe"
                      />
                      {addressErrors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="label">Email *</label>
                      <input
                        {...registerAddress('email')}
                        type="email"
                        className="input-field"
                        placeholder="john@example.com"
                      />
                      {addressErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="label">Phone Number *</label>
                    <input
                      {...registerAddress('phone')}
                      type="tel"
                      className="input-field"
                      placeholder="(123) 456-7890"
                    />
                    {addressErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Street Address *</label>
                    <input
                      {...registerAddress('street')}
                      className="input-field"
                      placeholder="123 Main Street, Apt 4B"
                    />
                    {addressErrors.street && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.street.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="label">City *</label>
                      <input
                        {...registerAddress('city')}
                        className="input-field"
                        placeholder="New York"
                      />
                      {addressErrors.city && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="label">State *</label>
                      <input
                        {...registerAddress('state')}
                        className="input-field"
                        placeholder="NY"
                      />
                      {addressErrors.state && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.state.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="label">ZIP Code *</label>
                      <input
                        {...registerAddress('zipCode')}
                        className="input-field"
                        placeholder="10001"
                      />
                      {addressErrors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.zipCode.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="mt-8">
                    <label className="label mb-4">Shipping Method</label>
                    <div className="space-y-3">
                      {[
                        { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', cost: 10 },
                        { id: 'express', name: 'Express Shipping', time: '2-3 business days', cost: 25 },
                        { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', cost: 50 },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            shippingMethod === method.id
                              ? 'border-pastel-purple bg-pastel-purple/10'
                              : 'border-gray-200 hover:border-pastel-purple/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shipping"
                                value={method.id}
                                checked={shippingMethod === method.id}
                                onChange={(e) => setShippingMethod(e.target.value)}
                                className="w-5 h-5 text-pastel-purple"
                              />
                              <div>
                                <div className="font-semibold">{method.name}</div>
                                <div className="text-sm text-gray-600">{method.time}</div>
                              </div>
                            </div>
                            <div className="text-lg font-bold text-gradient">
                              ${method.cost}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full mt-8">
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CreditCard className="w-7 h-7 text-pastel-purple" aria-hidden="true" />
                  Payment Information
                </h2>

                <form onSubmit={handlePaymentSubmit(onPaymentSubmit)} className="space-y-6">
                  <div>
                    <label className="label">Card Number *</label>
                    <input
                      {...registerPayment('cardNumber')}
                      className="input-field"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {paymentErrors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{paymentErrors.cardNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Cardholder Name *</label>
                    <input
                      {...registerPayment('cardName')}
                      className="input-field"
                      placeholder="John Doe"
                    />
                    {paymentErrors.cardName && (
                      <p className="text-red-500 text-sm mt-1">{paymentErrors.cardName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="label">Expiry Date *</label>
                      <input
                        {...registerPayment('expiryDate')}
                        className="input-field"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {paymentErrors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{paymentErrors.expiryDate.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="label">CVV *</label>
                      <input
                        {...registerPayment('cvv')}
                        className="input-field"
                        placeholder="123"
                        maxLength={4}
                      />
                      {paymentErrors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{paymentErrors.cvv.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pastel-blue/20 to-pastel-purple/20 rounded-lg p-6 mt-8">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                        🔒
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Secure Payment</h3>
                        <p className="text-sm text-gray-600">
                          Your payment information is encrypted and secure. We never store your card details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button type="submit" className="btn-primary flex-1">
                      Place Order
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => {
                  const itemPrice = item.cake.sizes.find(s => s.size === item.selectedSize)?.price || item.cake.price;
                  return (
                    <div key={`${item.cake.id}-${item.selectedSize}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-3xl">{item.cake.images[0]}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{item.cake.name}</div>
                        <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                        <div className="text-sm font-bold text-gradient">${itemPrice * item.quantity}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-gradient">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {addressData && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold mb-2 text-sm">Delivery Address</h3>
                  <div className="text-sm text-gray-600">
                    <p>{addressData.fullName}</p>
                    <p>{addressData.street}</p>
                    <p>{addressData.city}, {addressData.state} {addressData.zipCode}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
