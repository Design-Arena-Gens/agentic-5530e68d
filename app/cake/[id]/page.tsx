'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Cake } from '@/types';
import { useStore } from '@/lib/store';

export default function CakeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [cake, setCake] = useState<Cake | null>(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState<string[]>([]);

  const addToCart = useStore((state) => state.addToCart);

  const customizationOptions = [
    'Extra Frosting',
    'Chocolate Drizzle',
    'Fresh Berries',
    'Edible Flowers',
    'Gold Leaf',
    'Sprinkles',
  ];

  const sizePriceMultiplier = {
    small: 0.8,
    medium: 1.0,
    large: 1.5,
  };

  useEffect(() => {
    fetch(`/api/cakes/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setCake(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params.id]);

  const handleAddToCart = () => {
    if (!cake) return;

    addToCart({
      cake,
      quantity,
      size,
      message,
      customizations,
    });

    router.push('/cart');
  };

  const toggleCustomization = (option: string) => {
    if (customizations.includes(option)) {
      setCustomizations(customizations.filter(c => c !== option));
    } else {
      setCustomizations([...customizations, option]);
    }
  };

  const calculatePrice = () => {
    if (!cake) return 0;
    const basePrice = cake.basePrice * sizePriceMultiplier[size];
    const customizationPrice = customizations.length * 3.99;
    return (basePrice + customizationPrice) * quantity;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-primary-600">Loading...</div>
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Cake not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{cake.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{cake.description}</p>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Size</label>
            <div className="flex gap-4">
              {(['small', 'medium', 'large'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-6 py-2 rounded-lg font-semibold capitalize ${
                    size === s
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Customizations (+$3.99 each)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {customizationOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleCustomization(option)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    customizations.includes(option)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Custom Message (Optional)
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g., Happy Birthday!"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-3xl font-bold text-primary-600">
              Total: ${calculatePrice().toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-primary-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
