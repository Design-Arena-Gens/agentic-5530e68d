'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Order, Cake } from '@/types';
import { Package, ShoppingBag, Edit, Trash2, Plus } from 'lucide-react';

export default function AdminPage() {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'cakes'>('orders');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }

    fetchOrders();
    fetchCakes();
  }, [user, router]);

  const fetchOrders = async () => {
    const response = await fetch('/api/orders');
    const data = await response.json();
    setOrders(data);
  };

  const fetchCakes = async () => {
    const response = await fetch('/api/cakes');
    const data = await response.json();
    setCakes(data);
  };

  const updateOrderStatus = async (orderId: number, status: Order['status']) => {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const deleteCake = async (cakeId: number) => {
    if (confirm('Are you sure you want to delete this cake?')) {
      await fetch(`/api/cakes/${cakeId}`, {
        method: 'DELETE',
      });
      fetchCakes();
    }
  };

  const toggleCakeAvailability = async (cakeId: number, available: boolean) => {
    await fetch(`/api/cakes/${cakeId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available }),
    });
    fetchCakes();
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold ${
            activeTab === 'orders'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Package size={20} />
          Orders
        </button>
        <button
          onClick={() => setActiveTab('cakes')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold ${
            activeTab === 'cakes'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ShoppingBag size={20} />
          Cakes
        </button>
      </div>

      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
                    <p className="text-gray-600">{order.customerName}</p>
                    <p className="text-gray-600 text-sm">{order.customerEmail}</p>
                    <p className="text-gray-600 text-sm">{order.customerPhone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">${order.total.toFixed(2)}</p>
                    <p className="text-gray-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 font-semibold mb-2">Items:</p>
                  {order.items.map((item, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      - {item.cake.name} ({item.size}) x {item.quantity}
                    </p>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 font-semibold">Delivery Address:</p>
                  <p className="text-gray-600 text-sm">{order.deliveryAddress}</p>
                </div>

                <div className="flex gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-gray-600 text-center py-8">No orders yet</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'cakes' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Manage Cakes</h2>
            <button
              onClick={() => router.push('/admin/cake/new')}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              <Plus size={20} />
              Add New Cake
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cakes.map((cake) => (
              <div key={cake.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={cake.image} alt={cake.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{cake.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{cake.description}</p>
                  <p className="text-xl font-bold text-primary-600 mb-2">
                    ${cake.basePrice.toFixed(2)}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/cake/${cake.id}`)}
                      className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => toggleCakeAvailability(cake.id, !cake.available)}
                      className={`px-3 py-2 rounded text-sm ${
                        cake.available
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {cake.available ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => deleteCake(cake.id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
