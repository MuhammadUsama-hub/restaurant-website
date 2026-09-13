'use client';

import { useState } from 'react';
import { Flame, Leaf, Plus, ArrowUpRight, ChefHat } from 'lucide-react';
import { FoodImage } from '@/components/food-card/food-image';
import { Button, Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui-kit';
import { QuantitySelector } from '@/components/cart/cart-drawer';
import { useCart } from '@/components/cart/cart-context';
import { formatPrice } from '@/lib/format';
import { categories } from '@/data/categories';
import type { MenuItem } from '@/types/menu';

export const FoodCard = ({ item }: { item: MenuItem }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { add } = useCart();
  const category = categories.find((entry) => entry.id === item.categoryId);
  return <>
    <article className="group h-full overflow-hidden rounded-lg border border-border/80 bg-card transition-shadow duration-300 hover:shadow-editorial">
      <button type="button" onClick={() => { setQuantity(1); setOpen(true); }} aria-label={`View ${item.name} details`} className="relative block aspect-[1.28] w-full overflow-hidden bg-muted text-left">
        <FoodImage src={item.image} alt={item.name} fill sizes="(max-width: 639px) 94vw, (max-width: 1023px) 46vw, 300px" className="transition-transform duration-700 motion-safe:group-hover:scale-105" />
        {item.badge && <span className="absolute left-3 top-3 rounded-sm bg-card px-2.5 py-1.5 text-[8px] font-bold tracking-[0.08em] text-card-foreground shadow-sm">{item.badge}</span>}
        <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"><ArrowUpRight size={15} /></span>
      </button>
      <div className="p-5"><div className="mb-2.5 flex items-center justify-between"><span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-primary">{category?.name}</span><span className="flex gap-1.5">{item.dietary.includes('spicy') && <span title="Spicy" aria-label="Spicy"><Flame size={13} className="text-primary" /></span>}{item.dietary.includes('vegetarian') && <span title="Vegetarian" aria-label="Vegetarian"><Leaf size={13} className="text-green-700" /></span>}</span></div>
        <h3 className="font-serif text-[23px] font-medium tracking-[-0.03em]"><button type="button" onClick={() => { setQuantity(1); setOpen(true); }} className="text-left transition-colors hover:text-primary">{item.name}</button></h3><p className="mt-2 min-h-[42px] text-[11px] leading-[1.8] text-muted-foreground">{item.description}</p><div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4"><span className="text-sm font-bold">{formatPrice(item.price)}</span><button type="button" onClick={() => add(item.id)} disabled={!item.available} aria-label={`Add ${item.name} to bag`} className="flex size-8 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-40"><Plus size={17} strokeWidth={1.5} /></button></div>
      </div>
    </article>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-[730px] gap-0 overflow-y-auto rounded-lg border-0 p-0 [&>button]:z-10 [&>button]:rounded-full [&>button]:bg-card [&>button]:p-2 [&>button]:opacity-100">
      <div className="relative h-52 bg-muted sm:h-72"><FoodImage src={item.image} alt={item.name} fill sizes="730px" /></div><div className="p-6 sm:p-8"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">{category?.name} · {item.portion}</p><DialogTitle className="font-serif text-3xl font-medium">{item.name}</DialogTitle><DialogDescription className="mt-4 text-sm leading-7">{item.details}</DialogDescription><div className="mt-5 flex flex-wrap gap-3">{item.dietary.map((diet) => <span key={diet} className="flex items-center gap-1 rounded-sm bg-secondary px-2 py-1 text-[10px] capitalize">{diet === 'spicy' ? <Flame size={12} /> : <Leaf size={12} />}{diet}</span>)}<span className="flex items-center gap-1 text-[10px] text-muted-foreground"><ChefHat size={12} /> Prepared fresh</span></div><p className="mt-4 text-[11px] leading-5 text-muted-foreground">{item.allergens.length ? `Contains: ${item.allergens.join(', ')}.` : 'No declared allergens in this demo recipe.'} Allergens are illustrative; always confirm with the restaurant.</p><div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5"><QuantitySelector quantity={quantity} onChange={setQuantity} name={item.name} /><Button className="h-11 min-w-40 flex-1 justify-between" onClick={() => { add(item.id, quantity); setOpen(false); }} disabled={!item.available}><span>Add to bag</span><span>{formatPrice(item.price * quantity)}</span></Button></div><p className="mt-3 text-[10px] text-muted-foreground">Demo menu · Representative food photography</p></div>
    </DialogContent></Dialog>
  </>;
};
