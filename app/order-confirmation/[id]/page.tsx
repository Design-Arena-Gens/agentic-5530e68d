'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Order } from '@/types';

export default function OrderConfirmationPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-primary-600">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Order not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order</p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Order Number</p>
              <p className="font-semibold text-gray-800">#{order.id}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Status</p>
              <p className="font-semibold text-gray-800 capitalize">{order.status}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Customer</p>
              <p className="font-semibold text-gray-800">{order.customerName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total</p>
              <p className="font-semibold text-primary-600 text-xl">${order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
          {order.items.map((item, index) => (
            <div key={index} className="flex gap-4 mb-4 pb-4 border-b border-gray-200">
              <img
                src={item.cake.image}
                alt={item.cake.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.cake.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.quantity} x {item.size}
                </p>
                {item.customizations.length > 0 && (
                  <p className="text-sm text-gray-600">+ {item.customizations.join(', ')}</p>
                )}
                {item.message && (
                  <p className="text-sm text-gray-600 italic">"{item.message}"</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Delivery Address</h2>
          <p className="text-gray-600">{order.deliveryAddress}</p>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
