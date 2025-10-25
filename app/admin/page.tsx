"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { 
  Package, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Users,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { cakes } from '@/lib/data';

export default function AdminPage() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const isAdmin = useStore((state) => state.isAdmin);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cakes' | 'orders' | 'customers'>('dashboard');

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push('/');
    }
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) {
    return null;
  }

  // Mock data
  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: '$12,456', change: '+12%', color: 'from-green-400 to-green-600' },
    { icon: ShoppingCart, label: 'Orders', value: '234', change: '+8%', color: 'from-blue-400 to-blue-600' },
    { icon: Package, label: 'Products', value: cakes.length.toString(), change: '+2', color: 'from-purple-400 to-purple-600' },
    { icon: Users, label: 'Customers', value: '1,234', change: '+15%', color: 'from-pink-400 to-pink-600' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', total: 45.99, status: 'processing', date: '2024-10-25' },
    { id: 'ORD-002', customer: 'Jane Smith', total: 96.50, status: 'shipped', date: '2024-10-24' },
    { id: 'ORD-003', customer: 'Bob Johnson', total: 52.00, status: 'delivered', date: '2024-10-23' },
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
    <div className="min-h-screen py-12 bg-gradient-to-br from-pastel-purple/10 to-pastel-blue/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your bakery operations</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white rounded-full shadow-md">
                <span className="text-sm text-gray-600">Welcome, </span>
                <span className="font-semibold">{user.name}</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'cakes', label: 'Cakes', icon: Package },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'customers', label: 'Customers', icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pastel-pink to-pastel-purple text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card p-8">
                  <h2 className="text-2xl font-bold mb-6">Sales Overview</h2>
                  <div className="h-64 bg-gradient-to-br from-pastel-pink/20 to-pastel-purple/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <p className="text-gray-600">Sales chart visualization</p>
                    </div>
                  </div>
                </div>

                <div className="card p-8">
                  <h2 className="text-2xl font-bold mb-6">Popular Products</h2>
                  <div className="space-y-4">
                    {cakes.slice(0, 5).map((cake, index) => (
                      <div key={cake.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 rounded-lg flex items-center justify-center">
                            {cake.images[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{cake.name}</div>
                            <div className="text-xs text-gray-600">{cake.reviews} reviews</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${cake.price}</div>
                          <div className="text-xs text-gray-600">⭐ {cake.rating}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Recent Orders</h2>
                  <button className="text-pastel-purple hover:underline font-semibold">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Total</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4 font-semibold">{order.id}</td>
                          <td className="py-4 px-4">{order.customer}</td>
                          <td className="py-4 px-4 text-gray-600">{order.date}</td>
                          <td className="py-4 px-4 font-bold text-gradient">${order.total}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-pastel-purple hover:underline text-sm font-semibold">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Cakes Management Tab */}
          {activeTab === 'cakes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Cake Inventory</h2>
                <button className="btn-primary flex items-center gap-2">
                  <Plus className="w-5 h-5" aria-hidden="true" />
                  Add New Cake
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cakes.map((cake) => (
                  <div key={cake.id} className="card overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 flex items-center justify-center">
                      <div className="text-7xl">{cake.images[0]}</div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{cake.name}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-gradient">${cake.price}</div>
                        <div className="text-sm text-gray-600">⭐ {cake.rating} ({cake.reviews})</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-pastel-blue/20 rounded-lg hover:bg-pastel-blue/30 transition-colors">
                          <Edit className="w-4 h-4" aria-hidden="true" />
                          <span className="text-sm font-semibold">Edit</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                          <span className="text-sm font-semibold">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6">All Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Total</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-semibold">{order.id}</td>
                        <td className="py-4 px-4">{order.customer}</td>
                        <td className="py-4 px-4 text-gray-600">{order.date}</td>
                        <td className="py-4 px-4 font-bold text-gradient">${order.total}</td>
                        <td className="py-4 px-4">
                          <select
                            defaultValue={order.status}
                            className="px-3 py-1 rounded-full text-xs font-semibold border-2 border-gray-200 focus:border-pastel-purple focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-pastel-purple hover:underline text-sm font-semibold mr-3">
                            View
                          </button>
                          <button className="text-red-500 hover:underline text-sm font-semibold">
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6">Customer Management</h2>
              <div className="text-center py-20">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2">Customer Management</h3>
                <p className="text-gray-600">View and manage customer accounts and information</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
