import { create } from 'zustand';
import { CartItem, User } from '@/types';

interface StoreState {
  cart: CartItem[];
  user: User | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateCartItem: (index: number, item: CartItem) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  user: null,
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (index) => set((state) => ({
    cart: state.cart.filter((_, i) => i !== index)
  })),
  updateCartItem: (index, item) => set((state) => ({
    cart: state.cart.map((cartItem, i) => i === index ? item : cartItem)
  })),
  clearCart: () => set({ cart: [] }),
  setUser: (user) => set({ user }),
}));
