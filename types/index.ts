export interface Cake {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: string;
  available: boolean;
}

export interface CartItem {
  cake: Cake;
  quantity: number;
  size: 'small' | 'medium' | 'large';
  message?: string;
  customizations: string[];
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'customer';
}
