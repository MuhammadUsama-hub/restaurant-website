'use client';

import { type ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import dynamic from 'next/dynamic';
import { CartProvider } from '@/components/cart/cart-context';
const CartDrawer = dynamic(() => import('@/components/cart/cart-drawer').then((module) => module.CartDrawer), { ssr: false });

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <MotionConfig reducedMotion="user"><CartProvider>{children}<CartDrawer /><Toaster position="bottom-right" closeButton toastOptions={{ className: 'font-sans', style: { background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', borderColor: 'hsl(var(--border))' } }} /></CartProvider></MotionConfig>;
};
