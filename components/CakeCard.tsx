'use client';

import { Cake } from '@/types';
import Link from 'next/link';

interface CakeCardProps {
  cake: Cake;
}

export default function CakeCard({ cake }: CakeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={cake.image}
        alt={cake.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{cake.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{cake.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${cake.basePrice.toFixed(2)}
          </span>
          <Link
            href={`/cake/${cake.id}`}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
