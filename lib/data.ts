import { Cake, Order, User } from '@/types';

export const initialCakes: Cake[] = [
  {
    id: 1,
    name: 'Chocolate Fudge Cake',
    description: 'Rich chocolate cake with creamy fudge frosting',
    basePrice: 25.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    category: 'Chocolate',
    available: true,
  },
  {
    id: 2,
    name: 'Vanilla Dream',
    description: 'Classic vanilla sponge with buttercream',
    basePrice: 22.99,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e5b80134?w=400',
    category: 'Vanilla',
    available: true,
  },
  {
    id: 3,
    name: 'Red Velvet',
    description: 'Smooth red velvet with cream cheese frosting',
    basePrice: 28.99,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400',
    category: 'Specialty',
    available: true,
  },
  {
    id: 4,
    name: 'Strawberry Delight',
    description: 'Fresh strawberry cake with whipped cream',
    basePrice: 26.99,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
    category: 'Fruit',
    available: true,
  },
  {
    id: 5,
    name: 'Lemon Zest',
    description: 'Tangy lemon cake with citrus glaze',
    basePrice: 24.99,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400',
    category: 'Fruit',
    available: true,
  },
  {
    id: 6,
    name: 'Black Forest',
    description: 'Chocolate cake with cherries and whipped cream',
    basePrice: 29.99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
    category: 'Chocolate',
    available: true,
  },
  {
    id: 7,
    name: 'Carrot Cake',
    description: 'Moist carrot cake with cream cheese frosting',
    basePrice: 27.99,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400',
    category: 'Specialty',
    available: true,
  },
  {
    id: 8,
    name: 'Blueberry Bliss',
    description: 'Light sponge with fresh blueberries',
    basePrice: 25.99,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
    category: 'Fruit',
    available: true,
  },
];

export let cakes: Cake[] = [...initialCakes];
export let orders: Order[] = [];
export let users: User[] = [
  {
    id: 1,
    email: 'admin@sweetbite.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
];

export const resetData = () => {
  cakes = [...initialCakes];
  orders = [];
};
