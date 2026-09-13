'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { toast } from 'sonner';
import { restaurantConfig } from '@/config/restaurant';
import { catalog } from '@/lib/catalog';
import type { CartLine } from '@/types/order';

interface CartContextValue {
  items: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  ready: boolean;
  setOpen: (value: boolean) => void;
  add: (id: string, quantity?: number) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
}
const CartContext = createContext<CartContextValue | null>(null);
const key = `${restaurantConfig.id}:cart:v1`;
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
      if (Array.isArray(saved)) {
        const clean = new Map<string, number>();
        saved.forEach((line) => {
          if (line && typeof line.itemId === 'string' && catalog.getItem(line.itemId)?.available && Number.isInteger(line.quantity) && line.quantity > 0) clean.set(line.itemId, Math.min(99, line.quantity));
        });
        setItems(Array.from(clean, ([itemId, quantity]) => ({ itemId, quantity })));
      }
    } catch { /* Cart remains usable if browser storage is unavailable. */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem(key, JSON.stringify(items)); } catch { /* In-memory fallback. */ } } }, [items, ready]);
  const add = useCallback((id: string, quantity = 1) => {
    const item = catalog.getItem(id);
    if (!item?.available || !Number.isInteger(quantity) || quantity < 1) return;
    setItems((current) => {
      const existing = current.find((line) => line.itemId === id);
      return existing ? current.map((line) => line.itemId === id ? { ...line, quantity: Math.min(99, line.quantity + quantity) } : line) : [...current, { itemId: id, quantity: Math.min(99, quantity) }];
    });
    toast.success(`${item.name} added to your bag`, { action: { label: 'View bag', onClick: () => setOpen(true) } });
  }, []);
  const update = (id: string, quantity: number) => setItems((current) => quantity <= 0 ? current.filter((line) => line.itemId !== id) : current.map((line) => line.itemId === id ? { ...line, quantity: Math.min(99, Math.floor(quantity)) } : line));
  const count = items.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = items.reduce((sum, line) => sum + (catalog.getItem(line.itemId)?.price ?? 0) * line.quantity, 0);
  return <CartContext.Provider value={{ items, count, subtotal, isOpen, ready, setOpen, add, update, clear: () => setItems([]) }}>{children}</CartContext.Provider>;
};
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('Cart components must be used inside CartProvider');
  return context;
}
