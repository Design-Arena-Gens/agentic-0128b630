"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Package, MapPin, User as UserIcon, LogOut, Settings } from 'lucide-react';
import { format } from 'date-fns';

export default function AccountPage() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setAdmin = useStore((state) => state.setAdmin);
  const isAdmin = useStore((state) => state.isAdmin);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    setAdmin(false);
    router.push('/');
  };

  // Mock orders for demonstration
  const mockOrders = [
    {
      id: 'ORD-001',
      items: [{ cake: { name: 'Chocolate Dream', images: ['🍫'] }, quantity: 1 }],
      total: 45.99,
      status: 'delivered' as const,
      createdAt: '2024-10-20T10:00:00Z',
      estimatedDelivery: '2024-10-22T10:00:00Z',
    },
    {
      id: 'ORD-002',
      items: [{ cake: { name: 'Red Velvet Romance', images: ['❤️'] }, quantity: 2 }],
      total: 96.50,
      status: 'shipped' as const,
      createdAt: '2024-10-23T14:30:00Z',
      estimatedDelivery: '2024-10-26T14:30:00Z',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 sticky top-24"
            >
              {/* Profile */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-pastel-pink to-pastel-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-4xl">👤</div>
                </div>
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-pastel-pink/30 to-pastel-purple/30 text-gray-800 font-semibold">
                  <UserIcon className="w-5 h-5" aria-hidden="true" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
                  <Package className="w-5 h-5" aria-hidden="true" />
                  Orders
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                  Addresses
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
                  <Settings className="w-5 h-5" aria-hidden="true" />
                  Settings
                </button>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-pastel-purple/20 transition-colors text-pastel-purple font-semibold"
                  >
                    🛠️ Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                >
                  <LogOut className="w-5 h-5" aria-hidden="true" />
                  Logout
                </button>
              </nav>
            </motion.div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-bold mb-8 text-gradient">My Account</h1>

              {/* Welcome Section */}
              <div className="card p-8 mb-8 bg-gradient-to-br from-pastel-pink/20 to-pastel-purple/20">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 🎉</h2>
                <p className="text-gray-700">
                  Manage your orders, addresses, and account settings from your dashboard.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card p-6 text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {mockOrders.length}
                  </div>
                  <div className="text-gray-600">Total Orders</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-4xl mb-2">🚚</div>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {mockOrders.filter(o => o.status === 'shipped').length}
                  </div>
                  <div className="text-gray-600">In Transit</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-4xl mb-2">✅</div>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {mockOrders.filter(o => o.status === 'delivered').length}
                  </div>
                  <div className="text-gray-600">Delivered</div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Recent Orders</h2>
                  <Link href="/orders" className="text-pastel-purple hover:underline font-semibold">
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-pastel-purple/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg">{order.id}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Ordered on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                          </p>
                          {order.status !== 'delivered' && (
                            <p className="text-sm text-gray-600">
                              Est. delivery: {format(new Date(order.estimatedDelivery), 'MMM dd, yyyy')}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gradient">
                            ${order.total.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="flex items-center gap-4 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 rounded-lg flex items-center justify-center text-2xl">
                              {item.cake.images[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-sm">{item.cake.name}</div>
                              <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link
                          href={`/orders/${order.id}`}
                          className="btn-secondary text-sm py-2 px-4"
                        >
                          View Details
                        </Link>
                        {order.status === 'delivered' && (
                          <button className="btn-primary text-sm py-2 px-4">
                            Order Again
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {mockOrders.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                    <Link href="/catalog" className="btn-primary inline-block">
                      Browse Cakes
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
