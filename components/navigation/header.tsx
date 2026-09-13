'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, MapPin, ShoppingBag } from 'lucide-react';
import { Brand } from '@/components/layout/brand';
import { navigation } from '@/config/navigation';
import { restaurantConfig as r } from '@/config/restaurant';
import { useCart } from '@/components/cart/cart-context';
import { Button, Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui-kit';

export const Header = () => {
  const path = usePathname();
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  return <>
    <div className="bg-contrast text-contrast-foreground"><div className="container flex max-w-7xl items-center justify-center gap-2 px-5 py-2.5 text-[9px] tracking-[0.15em] sm:justify-between sm:text-[10px]"><span>{r.content.announcement}</span><span className="hidden items-center gap-1.5 text-contrast-foreground/80 sm:flex"><MapPin size={12} /> {r.locality}, {r.city}</span></div></div>
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="container flex h-[86px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">{navigation.map((link) => <Link key={link.href} href={link.href} aria-current={path === link.href ? 'page' : undefined} className={`relative py-3 text-[13px] font-medium transition-colors hover:text-primary ${path === link.href ? 'text-primary after:absolute after:bottom-1.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary' : 'text-foreground/80'}`}>{link.label}</Link>)}</nav>
        <div className="flex items-center gap-3 sm:gap-5"><button type="button" onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`} className="relative rounded-sm p-2 text-foreground transition-colors hover:text-primary"><ShoppingBag size={21} strokeWidth={1.5} />{count > 0 && <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">{count}</span>}</button><Button asChild className="hidden h-11 gap-5 px-5 sm:inline-flex"><Link href="/menu">Order Now <ArrowUpRight size={16} /></Link></Button><button type="button" aria-label="Open navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)} className="rounded-sm p-2 lg:hidden"><Menu size={24} strokeWidth={1.5} /></button></div>
      </div>
    </header>
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent className="flex w-full flex-col px-7 sm:max-w-sm"><SheetTitle className="mt-5"><Brand /></SheetTitle><SheetDescription className="mt-2">{r.tagline}</SheetDescription><nav aria-label="Mobile navigation" className="mt-7 flex flex-col divide-y divide-border">{navigation.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center justify-between py-5 font-serif text-2xl hover:text-primary">{link.label}<ArrowUpRight size={19} /></Link>)}</nav><Button asChild className="mt-7 h-12"><Link href="/menu" onClick={() => setMobileOpen(false)}>Explore the menu <ArrowUpRight size={16} /></Link></Button><p className="mt-auto pb-6 text-xs text-muted-foreground">{r.locality}, {r.city}</p></SheetContent></Sheet>
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:hidden"><Button className="h-11 w-full justify-between" asChild><Link href={count ? '/order' : '/menu'}><span className="flex items-center gap-2"><ShoppingBag size={16} />{count ? `View my order (${count})` : 'Order something delicious'}</span><ArrowUpRight size={17} /></Link></Button></div>
  </>;
};
