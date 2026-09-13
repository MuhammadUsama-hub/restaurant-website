'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { menuItems } from '@/data/menu';
import { FoodImage } from '@/components/food-card/food-image';
import { ContactAction } from '@/components/sections/contact-action';
import { Button, Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui-kit';
import type { MenuItem } from '@/types/menu';

const images = ['chicken-tikka', 'chicken-biryani', 'chicken-karahi', 'mint-lemonade', 'gulab-jamun'].map((id) => menuItems.find((item) => item.id === id)!);
export const SocialGallery = () => {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  return <section className="container max-w-7xl px-5 py-20 sm:px-8"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-primary"><Instagram size={14} /> A LITTLE FOOD FOR YOUR FEED</p><h2 className="font-serif text-[clamp(2rem,3.3vw,3rem)] font-medium tracking-[-0.035em]">Served fresh. Shared often.</h2></div><ContactAction kind="instagram" className="inline-flex items-center gap-3 self-start border-b border-foreground/30 pb-1.5 text-xs font-medium sm:self-auto">Follow on Instagram <ArrowUpRight size={15} /></ContactAction></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{images.map((item, index) => <button type="button" key={item.id} onClick={() => setSelected(item)} aria-label={`View ${item.name} photo`} className={`group relative aspect-square overflow-hidden rounded-md bg-muted ${index === 4 ? 'hidden sm:block' : ''}`}><FoodImage src={item.image} alt={item.name} fill sizes="(max-width: 640px) 46vw, 240px" className="transition-transform duration-500 motion-safe:group-hover:scale-105" /><span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><Instagram size={25} className="text-white" /></span></button>)}</div><p className="mt-3 text-[10px] text-muted-foreground">Curated demo gallery · Representative food photography, not a live social feed</p><Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}><DialogContent className="w-[calc(100%-2rem)] overflow-hidden rounded-lg p-0 [&>button]:rounded-full [&>button]:bg-card [&>button]:p-1.5 [&>button]:opacity-100">{selected && <><div className="relative aspect-[1.2] bg-muted"><FoodImage src={selected.image} alt={selected.name} fill sizes="512px" /></div><div className="p-6"><DialogTitle className="font-serif text-2xl">{selected.name}</DialogTitle><DialogDescription className="mt-3 leading-6">{selected.description}</DialogDescription><Button asChild className="mt-5"><Link href={`/menu?category=${selected.categoryId}`} onClick={() => setSelected(null)}>Discover this dish <ArrowUpRight size={16} /></Link></Button></div></>}</DialogContent></Dialog></section>;
};
