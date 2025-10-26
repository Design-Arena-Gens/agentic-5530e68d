'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function CustomizePage() {
  const router = useRouter();
  const addToCart = useStore((state) => state.addToCart);

  const [formData, setFormData] = useState({
    flavor: 'chocolate',
    size: 'medium' as 'small' | 'medium' | 'large',
    frosting: 'buttercream',
    filling: 'vanilla',
    message: '',
    quantity: 1,
  });

  const [customizations, setCustomizations] = useState<string[]>([]);

  const customizationOptions = [
    'Extra Frosting',
    'Chocolate Drizzle',
    'Fresh Berries',
    'Edible Flowers',
    'Gold Leaf',
    'Sprinkles',
    'Caramel Sauce',
    'Nuts',
  ];

  const flavorPrices: Record<string, number> = {
    chocolate: 25.99,
    vanilla: 22.99,
    strawberry: 26.99,
    red_velvet: 28.99,
    lemon: 24.99,
    carrot: 27.99,
  };

  const sizePriceMultiplier = {
    small: 0.8,
    medium: 1.0,
    large: 1.5,
  };

  const toggleCustomization = (option: string) => {
    if (customizations.includes(option)) {
      setCustomizations(customizations.filter(c => c !== option));
    } else {
      setCustomizations([...customizations, option]);
    }
  };

  const calculatePrice = () => {
    const basePrice = flavorPrices[formData.flavor] * sizePriceMultiplier[formData.size];
    const customizationPrice = customizations.length * 3.99;
    return (basePrice + customizationPrice) * formData.quantity;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customCake = {
      id: Date.now(),
      name: `Custom ${formData.flavor} Cake`,
      description: `Custom made with ${formData.frosting} frosting and ${formData.filling} filling`,
      basePrice: flavorPrices[formData.flavor],
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
      category: 'Custom',
      available: true,
    };

    addToCart({
      cake: customCake,
      quantity: formData.quantity,
      size: formData.size,
      message: formData.message,
      customizations,
    });

    router.push('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Customize Your Cake</h1>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Flavor *</label>
            <select
              value={formData.flavor}
              onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="chocolate">Chocolate - $25.99</option>
              <option value="vanilla">Vanilla - $22.99</option>
              <option value="strawberry">Strawberry - $26.99</option>
              <option value="red_velvet">Red Velvet - $28.99</option>
              <option value="lemon">Lemon - $24.99</option>
              <option value="carrot">Carrot - $27.99</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Size *</label>
            <div className="flex gap-4">
              {(['small', 'medium', 'large'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormData({ ...formData, size: s })}
                  className={`px-6 py-2 rounded-lg font-semibold capitalize ${
                    formData.size === s
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
            <label className="block text-gray-700 font-semibold mb-2">Frosting Type *</label>
            <select
              value={formData.frosting}
              onChange={(e) => setFormData({ ...formData, frosting: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="buttercream">Buttercream</option>
              <option value="cream_cheese">Cream Cheese</option>
              <option value="whipped_cream">Whipped Cream</option>
              <option value="fondant">Fondant</option>
              <option value="ganache">Ganache</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Filling *</label>
            <select
              value={formData.filling}
              onChange={(e) => setFormData({ ...formData, filling: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="vanilla">Vanilla Cream</option>
              <option value="chocolate">Chocolate</option>
              <option value="strawberry">Strawberry</option>
              <option value="raspberry">Raspberry</option>
              <option value="lemon">Lemon Curd</option>
              <option value="caramel">Caramel</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Additional Customizations (+$3.99 each)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {customizationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
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
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g., Happy Birthday!"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-xl font-semibold">{formData.quantity}</span>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
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
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
          >
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}
