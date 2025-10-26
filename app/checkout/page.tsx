'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizePriceMultiplier = {
    small: 0.8,
    medium: 1.0,
    large: 1.5,
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const basePrice = item.cake.basePrice * sizePriceMultiplier[item.size];
      const customizationPrice = item.customizations.length * 3.99;
      return total + (basePrice + customizationPrice) * item.quantity;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          total: calculateTotal(),
          ...formData,
        }),
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        router.push(`/order-confirmation/${order.id}`);
      }
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && cart.length === 0) {
      router.push('/cart');
    }
  }, [mounted, cart.length, router]);

  if (!mounted || cart.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Information</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Delivery Address *
              </label>
              <textarea
                required
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

            {cart.map((item, index) => {
              const basePrice = item.cake.basePrice * sizePriceMultiplier[item.size];
              const customizationPrice = item.customizations.length * 3.99;
              const itemTotal = (basePrice + customizationPrice) * item.quantity;

              return (
                <div key={index} className="mb-4 pb-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">{item.cake.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x {item.size} - ${itemTotal.toFixed(2)}
                  </p>
                  {item.customizations.length > 0 && (
                    <p className="text-sm text-gray-600">+ {item.customizations.join(', ')}</p>
                  )}
                </div>
              );
            })}

            <div className="mt-6 pt-4 border-t-2 border-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Total:</span>
                <span className="text-3xl font-bold text-primary-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
