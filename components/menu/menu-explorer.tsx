'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, X, UtensilsCrossed, Flame, CookingPot, Soup, Beef, Sandwich, CupSoda, CakeSlice, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { categories } from '@/data/categories';
import { menuItems } from '@/data/menu';
import { FoodCard } from '@/components/food-card/food-card';
import { Button, Input } from '@/components/ui-kit';

const icons: Record<string, typeof Flame> = { rice: Soup, pot: CookingPot, flame: Flame, soup: Soup, noodles: Beef, burger: Sandwich, cup: CupSoda, dessert: CakeSlice };
export const MenuExplorer = ({ compact = false, initialCategory = 'all' }: { compact?: boolean; initialCategory?: string }) => {
  const [category, setCategory] = useState(categories.some((item) => item.id === initialCategory) ? initialCategory : 'all');
  const [query, setQuery] = useState('');
  const [vegetarian, setVegetarian] = useState(false);
  const filtered = menuItems.filter((item) => (category === 'all' || item.categoryId === category) && (!vegetarian || item.dietary.includes('vegetarian')) && `${item.name} ${item.description} ${item.categoryId}`.toLowerCase().includes(query.toLowerCase().trim()));
  const shown = compact ? filtered.slice(0, 4) : filtered;
  const reset = () => { setCategory('all'); setQuery(''); setVegetarian(false); };
  return <div>
    <div className="flex flex-col gap-5 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between"><div role="group" aria-label="Menu categories" className="flex max-w-full gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
      <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')} className={`flex shrink-0 items-center gap-2 rounded-md px-3.5 py-3 text-[11px] font-medium transition-colors ${category === 'all' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover:bg-secondary'}`}><UtensilsCrossed size={14} />All</button>
      {categories.map((entry) => { const Icon = icons[entry.icon] ?? UtensilsCrossed; return <button type="button" key={entry.id} aria-pressed={category === entry.id} onClick={() => setCategory(entry.id)} className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-3 text-[11px] font-medium transition-colors ${category === entry.id ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover:bg-secondary'}`}><Icon size={14} />{entry.name}</button>; })}
    </div><div className="relative min-w-0 lg:w-[210px] lg:shrink-0"><Search size={15} className="absolute left-3 top-3 text-muted-foreground" /><Input aria-label="Search menu" placeholder="Find your craving..." type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 bg-card pl-9 text-xs" /></div></div>
    {!compact && <div className="flex items-center justify-between gap-3 py-5"><p className="text-xs text-muted-foreground" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'} to discover</p><label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground"><SlidersHorizontal size={13} /><input type="checkbox" checked={vegetarian} onChange={(event) => setVegetarian(event.target.checked)} className="size-3.5 accent-[hsl(var(--primary))]" />Vegetarian only</label></div>}
    {shown.length ? <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${compact ? 'mt-7' : ''}`}>{shown.map((item) => <FoodCard key={item.id} item={item} />)}</div> : <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-card px-5 py-16 text-center"><Search size={30} strokeWidth={1.3} className="mb-5 text-primary" /><h3 className="font-serif text-2xl">No dishes found.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Try another search or category. There’s still plenty of good food to discover.</p><Button onClick={reset} variant="outline" className="mt-5"><X size={14} />Clear filters</Button></div>}
    {compact && <div className="mt-9 text-center"><Button variant="outline" asChild className="h-12 gap-5 border-foreground/20 bg-transparent px-7"><Link href={`/menu${category === 'all' ? '' : `?category=${category}`}`}>Discover the full menu <ArrowRight size={16} /></Link></Button></div>}
  </div>;
};
