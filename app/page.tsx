'use client';

import { useEffect, useState } from 'react';
import CakeCard from '@/components/CakeCard';
import { Cake } from '@/types';

export default function Home() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cakes')
      .then(res => res.json())
      .then(data => {
        setCakes(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-primary-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary-600 mb-4">Welcome to SweetBite</h1>
        <p className="text-xl text-gray-600">Order delicious custom cakes for every occasion</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Cakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cakes.map(cake => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </section>
    </div>
  );
}
