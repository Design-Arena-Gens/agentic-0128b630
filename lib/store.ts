import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  flavor: string;
  occasion: string;
  dietaryInfo: string[];
  images: string[];
  sizes: { size: string; price: number }[];
  frostingOptions: string[];
  rating: number;
  reviews: number;
}

export interface CartItem {
  cake: Cake;
  quantity: number;
  selectedSize: string;
  selectedFrosting: string;
  customMessage?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: Address;
  createdAt: string;
  estimatedDelivery: string;
}

interface StoreState {
  cart: CartItem[];
  user: User | null;
  isAdmin: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cakeId: string) => void;
  updateQuantity: (cakeId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
  setAdmin: (isAdmin: boolean) => void;
  getCartTotal: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      user: null,
      isAdmin: false,

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) =>
              cartItem.cake.id === item.cake.id &&
              cartItem.selectedSize === item.selectedSize &&
              cartItem.selectedFrosting === item.selectedFrosting
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem === existingItem
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              ),
            };
          }

          return { cart: [...state.cart, item] };
        }),

      removeFromCart: (cakeId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cake.id !== cakeId),
        })),

      updateQuantity: (cakeId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cake.id === cakeId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      setUser: (user) => set({ user }),

      setAdmin: (isAdmin) => set({ isAdmin }),

      getCartTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => {
          const sizePrice = item.cake.sizes.find(s => s.size === item.selectedSize)?.price || item.cake.price;
          return total + sizePrice * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'sweet-delights-storage',
    }
  )
);
