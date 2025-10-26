'use client';

import Link from 'next/link';
import { ShoppingCart, User, Cake as CakeIcon } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Header() {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);

  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <CakeIcon size={32} />
            <span className="text-2xl font-bold">SweetBite</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link href="/" className="hover:text-primary-200 transition">
              Home
            </Link>
            <Link href="/customize" className="hover:text-primary-200 transition">
              Customize
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin" className="hover:text-primary-200 transition">
                Admin
              </Link>
            )}
            <Link href="/cart" className="relative hover:text-primary-200 transition">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-primary-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link href="/login" className="hover:text-primary-200 transition">
              <User size={24} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
