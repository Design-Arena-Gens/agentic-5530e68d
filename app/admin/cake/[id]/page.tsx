'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Cake } from '@/types';

export default function EditCakePage() {
  const params = useParams();
  const router = useRouter();
  const [cake, setCake] = useState<Cake | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    fetch(`/api/cakes/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setCake(data);
        setFormData({
          name: data.name,
          description: data.description,
          basePrice: data.basePrice.toString(),
          image: data.image,
          category: data.category,
        });
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/cakes/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        basePrice: parseFloat(formData.basePrice),
      }),
    });

    if (response.ok) {
      router.push('/admin');
    }
  };

  if (!cake) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-primary-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Cake</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Base Price *</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Image URL *</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Category *</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Update Cake
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
