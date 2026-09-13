'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/components/cart/cart-context';
import { Button, Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui-kit';
import { FoodImage } from '@/components/food-card/food-image';
import { catalog } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';

export const QuantitySelector = ({ quantity, onChange, name, min = 1 }: { quantity: number; onChange: (value: number) => void; name: string; min?: number }) => {
  return <div className="inline-flex h-10 shrink-0 items-center rounded-md border border-border bg-background">
    <button type="button" aria-label={`Decrease ${name} quantity`} disabled={quantity <= min} onClick={() => onChange(quantity - 1)} className="flex size-10 items-center justify-center rounded-l-md transition-colors hover:bg-secondary disabled:opacity-30"><Minus size={14} /></button>
    <span aria-live="polite" className="min-w-6 text-center text-sm font-semibold tabular-nums">{quantity}</span>
    <button type="button" aria-label={`Increase ${name} quantity`} disabled={quantity >= 99} onClick={() => onChange(quantity + 1)} className="flex size-10 items-center justify-center rounded-r-md transition-colors hover:bg-secondary disabled:opacity-30"><Plus size={14} /></button>
  </div>;
};
export const CartLines = () => {
  const { items, update } = useCart();
  return <div className="divide-y divide-border">{items.map((line) => {
    const item = catalog.getItem(line.itemId);
    if (!item) return null;
    return <div key={item.id} className="flex gap-4 py-5">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted"><FoodImage src={item.image} alt={item.name} fill sizes="80px" /></div>
      <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><h3 className="text-sm font-semibold">{item.name}</h3><button type="button" onClick={() => update(item.id, 0)} aria-label={`Remove ${item.name}`} className="rounded-sm p-1 text-muted-foreground hover:text-primary"><Trash2 size={15} /></button></div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2"><QuantitySelector quantity={line.quantity} onChange={(value) => update(item.id, value)} name={item.name} min={0} /><span className="text-sm font-semibold">{formatPrice(item.price * line.quantity)}</span></div>
      </div>
    </div>;
  })}</div>;
};
export const CartDrawer = () => {
  const { isOpen, setOpen, count, subtotal } = useCart();
  return <Sheet open={isOpen} onOpenChange={setOpen}><SheetContent className="flex w-full flex-col px-5 sm:max-w-[440px] sm:px-7">
    <div className="border-b border-border pb-5 pt-3"><SheetTitle className="flex items-center gap-3 font-serif text-2xl"><ShoppingBag size={22} /> Your bag <span className="font-sans text-base text-muted-foreground">({count})</span></SheetTitle><SheetDescription className="mt-2 text-xs">A little bit of everything you love.</SheetDescription></div>
    {count ? <><div className="min-h-0 flex-1 overflow-y-auto"><CartLines /></div><div className="border-t border-border pt-5"><div className="mb-2 flex justify-between font-semibold"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><p className="mb-5 text-xs leading-relaxed text-muted-foreground">Demo prices. Delivery charges and taxes are not configured.</p><Button className="h-12 w-full" asChild><Link href="/order" onClick={() => setOpen(false)}>Review my order <ArrowRight size={16} /></Link></Button><p className="mt-3 text-center text-[11px] text-muted-foreground">Demo only · No orders are sent or payments taken</p></div></> : <div className="flex flex-1 flex-col items-center justify-center py-12 text-center"><span className="mb-6 rounded-full bg-secondary p-6"><ShoppingBag size={36} strokeWidth={1.2} className="text-primary" /></span><h3 className="font-serif text-2xl">Something delicious awaits.</h3><p className="mt-3 max-w-64 text-sm leading-relaxed text-muted-foreground">Your bag is empty. Explore the menu and find your new favorite.</p><Button asChild className="mt-7 h-11"><Link href="/menu" onClick={() => setOpen(false)}>Explore the menu <ArrowRight size={16} /></Link></Button></div>}
  </SheetContent></Sheet>;
};
