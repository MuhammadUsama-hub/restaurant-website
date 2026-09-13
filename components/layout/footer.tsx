import Link from 'next/link';
import { MapPin, ArrowUpRight, Heart } from 'lucide-react';
import { restaurantConfig as r } from '@/config/restaurant';
import { categories } from '@/data/categories';
import { Brand } from '@/components/layout/brand';
import { ThemeSwitcher } from '@/components/layout/theme-switcher';

export const Footer = () => {
  return <footer className="bg-contrast pb-24 text-contrast-foreground sm:pb-0"><div className="container max-w-7xl px-5 pt-16 sm:px-8 lg:pt-20">
    <div className="grid gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.8fr_1.1fr] lg:gap-14">
      <div><Brand light /><p className="mt-5 max-w-64 text-sm leading-7 text-contrast-foreground/65">Authentic flavors. Honest ingredients. Food that feels like home.</p><p className="mt-5 flex items-center gap-1.5 text-xs text-contrast-foreground/70">Made with <Heart size={12} className="text-primary" /> in {r.city}</p></div>
      <div><h3 className="mb-5 text-[11px] font-semibold tracking-[0.15em]">EXPLORE</h3><ul className="space-y-3 text-sm text-contrast-foreground/65">{[{ label: 'Our menu', href: '/menu' }, { label: 'Our story', href: '/about' }, { label: 'Special offers', href: '/#offers' }, { label: 'Customer reviews', href: '/#reviews' }, { label: 'Get in touch', href: '/contact' }].map((link) => <li key={link.href}><Link className="transition-colors hover:text-contrast-foreground" href={link.href}>{link.label}</Link></li>)}</ul></div>
      <div><h3 className="mb-5 text-[11px] font-semibold tracking-[0.15em]">FROM THE KITCHEN</h3><ul className="space-y-3 text-sm text-contrast-foreground/65">{categories.slice(0, 5).map((category) => <li key={category.id}><Link className="transition-colors hover:text-contrast-foreground" href={`/menu?category=${category.id}`}>{category.name}</Link></li>)}</ul></div>
      <div><h3 className="mb-5 text-[11px] font-semibold tracking-[0.15em]">COME SAY SALAM</h3><p className="flex items-start gap-2 text-sm leading-6 text-contrast-foreground/65"><MapPin size={16} className="mt-1 shrink-0 text-primary" />{r.address}</p><Link href="/locations" className="mt-4 inline-flex items-center gap-2 text-xs text-contrast-foreground underline underline-offset-4">Find us <ArrowUpRight size={13} /></Link><p className="mt-6 text-xs text-contrast-foreground/60">{r.business.openingHours[0]?.hours}</p>{r.demo && <p className="mt-1 text-[10px] text-contrast-foreground/50">Illustrative hours · confirm before visiting</p>}</div>
    </div>
    <div className="flex flex-col justify-between gap-5 border-t border-contrast-foreground/15 py-6 sm:flex-row sm:items-center"><p className="text-[11px] text-contrast-foreground/60">© {new Date().getFullYear()} {r.name}. All rights reserved.</p>{r.demo && <ThemeSwitcher />}</div>
    {r.demo && <div className="border-t border-contrast-foreground/10 pb-6 pt-4 text-[10px] leading-5 text-contrast-foreground/50">Independent concept demo, not the restaurant’s official website. Menu, prices, offers, testimonials, service options, and hours are illustrative. Food photos are representative. No orders or payments are processed.</div>}
  </div></footer>;
};
