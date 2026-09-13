'use client';

import { ArrowUpRight, Sparkles } from 'lucide-react';
import { promotions } from '@/data/promotions';
import { FoodImage } from '@/components/food-card/food-image';
import { useCart } from '@/components/cart/cart-context';
import { formatPrice } from '@/lib/format';

export const Promotions = () => {
  const { add } = useCart();
  return <div className="grid gap-6 lg:grid-cols-2">{promotions.map((offer) => <article key={offer.id} className={`relative isolate min-h-[315px] overflow-hidden rounded-lg ${offer.tone === 'dark' ? 'bg-contrast text-contrast-foreground' : 'bg-secondary text-secondary-foreground'}`}>
    <div className="absolute inset-y-0 right-0 -z-10 w-[46%] overflow-hidden opacity-45 sm:opacity-80"><FoodImage src={offer.image} alt={offer.name} fill sizes="300px" className="object-cover" /><div className={`absolute inset-0 bg-gradient-to-r ${offer.tone === 'dark' ? 'from-contrast via-contrast/20 to-transparent' : 'from-secondary via-secondary/20 to-transparent'}`} /></div>
    <div className="relative w-[82%] p-7 sm:w-[77%] sm:p-9"><p className="flex items-center gap-2 text-[9px] font-semibold tracking-[0.16em]"><Sparkles size={12} />{offer.eyebrow}</p><h3 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-[-0.03em]">{offer.name}</h3><p className="mt-3 max-w-[250px] text-xs leading-6 opacity-75">{offer.description}</p><div className="mt-5 flex items-baseline gap-3"><span className="text-xl font-semibold">{formatPrice(offer.price)}</span><del className="text-xs opacity-60">{formatPrice(offer.originalPrice)}</del></div><button type="button" onClick={() => add(offer.id)} className={`mt-5 inline-flex items-center gap-5 border-b pb-1.5 text-xs font-semibold transition-opacity hover:opacity-70 ${offer.tone === 'dark' ? 'border-contrast-foreground/40' : 'border-secondary-foreground/40'}`}>Add this deal <ArrowUpRight size={15} /></button></div><span className="absolute bottom-3 right-4 text-[8px] uppercase tracking-widest opacity-60">Demo offer</span>
  </article>)}</div>;
};
