'use client';

import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const router = useRouter();

  const sizePriceMultiplier = {
    small: 0.8,
    medium: 1.0,
    large: 1.5,
  };

  const calculateItemPrice = (index: number) => {
    const item = cart[index];
    const basePrice = item.cake.basePrice * sizePriceMultiplier[item.size];
    const customizationPrice = item.customizations.length * 3.99;
    return (basePrice + customizationPrice) * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, _, index) => total + calculateItemPrice(index), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some delicious cakes to get started!</p>
        <button
          onClick={() => router.push('/')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
        >
          Browse Cakes
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="flex gap-4">
                <img
                  src={item.cake.image}
                  alt={item.cake.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{item.cake.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">Size: {item.size}</p>
                  <p className="text-gray-600 text-sm mb-2">Quantity: {item.quantity}</p>
                  {item.customizations.length > 0 && (
                    <p className="text-gray-600 text-sm mb-2">
                      Customizations: {item.customizations.join(', ')}
                    </p>
                  )}
                  {item.message && (
                    <p className="text-gray-600 text-sm mb-2">Message: "{item.message}"</p>
                  )}
                  <p className="text-xl font-bold text-primary-600 mt-2">
                    ${calculateItemPrice(index).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Total:</span>
                <span className="text-2xl font-bold text-primary-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-primary-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
