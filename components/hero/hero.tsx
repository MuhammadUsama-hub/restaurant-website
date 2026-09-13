'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChefHat, Flame, Leaf, MapPin, UtensilsCrossed, Sparkle } from 'lucide-react';
import { restaurantConfig as r } from '@/config/restaurant';
import { FoodImage } from '@/components/food-card/food-image';
import { Button } from '@/components/ui-kit';

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.055]);
  return <section ref={ref} className="relative isolate overflow-hidden bg-background" aria-labelledby="hero-title">
    <div className="container relative grid max-w-7xl items-center gap-10 px-5 pb-14 pt-12 sm:px-8 sm:pt-14 lg:min-h-[640px] lg:grid-cols-[1fr_1.04fr] lg:gap-12 lg:pb-16 lg:pt-10">
      <div className="relative z-10 py-2 lg:pb-6">
        <p className="mb-6 flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.19em] text-primary sm:text-[11px]"><span className="h-px w-7 bg-primary" />{r.content.hero.eyebrow}</p>
        <h1 id="hero-title" className="font-serif text-[clamp(3.3rem,6.6vw,5.6rem)] font-medium leading-[1.08] tracking-[-0.055em]">{r.content.hero.title}<br /><span className="italic text-primary">{r.content.hero.accent}</span></h1>
        <p className="mt-6 max-w-[395px] text-sm leading-[1.9] text-muted-foreground sm:text-[15px]">{r.content.hero.description}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild className="h-[50px] gap-6 px-6 text-[13px]"><Link href="/menu">Order Now <ArrowUpRight size={17} /></Link></Button><Button asChild variant="outline" className="h-[50px] gap-6 border-foreground/20 bg-transparent px-6 text-[13px]"><Link href="/menu">View Menu <ArrowRight size={16} /></Link></Button></div>
        <div className="mt-10 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full border border-border bg-card"><MapPin size={17} strokeWidth={1.5} className="text-primary" /></span><div><p className="text-[11px] font-semibold">A taste of home, in {r.locality}.</p><p className="mt-1 text-[10px] text-muted-foreground">{r.content.hero.note}</p></div></div>
      </div>
      <div className="relative mx-auto w-full max-w-[600px] pb-4 pl-3 pr-2 sm:pl-5 lg:pl-0">
        <div aria-hidden="true" className="absolute -right-10 -top-8 size-64 rounded-full border border-primary/15 sm:size-80" />
        <div aria-hidden="true" className="absolute -right-5 -top-3 size-64 rounded-full border border-primary/10 sm:size-80" />
        <motion.div style={reduced ? {} : { y }} className="relative h-[360px] overflow-hidden rounded-bl-xl rounded-br-[110px] rounded-tl-[120px] rounded-tr-xl shadow-editorial sm:h-[490px] lg:h-[510px]">
          <motion.div style={reduced ? {} : { scale }} className="absolute inset-0"><FoodImage src={r.heroImage} alt="A generous bowl of fragrant chicken biryani with golden rice and fresh mint" fill priority sizes="(max-width: 640px) 92vw, (max-width: 1024px) 600px, 580px" className="object-[50%_58%]" /></motion.div>
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-9 left-7 text-white sm:left-9"><p className="mb-2 text-[9px] tracking-[0.2em] text-white/85">THE COMFORT YOU CRAVE</p><p className="font-serif text-[25px]">Made for your first bite.</p></div>
        </motion.div>
        <motion.div style={reduced ? {} : { y: badgeY }} className="absolute -left-1 bottom-[-3px] z-10 flex items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-3.5 shadow-editorial sm:-left-6 sm:bottom-[-4px] sm:px-5"><span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary"><ChefHat size={24} strokeWidth={1.4} /></span><div><p className="text-xs font-semibold">Big on flavor. Made with love.</p><p className="mt-1 text-[10px] text-muted-foreground">From our kitchen to your table.</p></div></motion.div>
        <div className="absolute right-[-4px] top-5 flex size-[84px] rotate-12 flex-col items-center justify-center rounded-full border-[5px] border-background bg-primary text-primary-foreground shadow-sm sm:-right-4 sm:top-8 sm:size-[96px]"><Sparkle size={19} strokeWidth={1.5} /><span className="mt-1 text-[9px] font-bold tracking-widest">DESI AT</span><span className="text-[10px] font-bold tracking-widest">HEART</span></div>
      </div>
    </div>
    <div className="border-y border-border bg-secondary/45"><div className="container grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-5 py-6 sm:px-8 lg:grid-cols-4 lg:gap-8">{[
      { icon: Leaf, title: 'Freshly made', text: 'Good ingredients. No shortcuts.' },
      { icon: Flame, title: 'Authentically Pakistani', text: 'The flavors you grew up loving.' },
      { icon: UtensilsCrossed, title: 'A seat for everyone', text: 'Bring your appetite. And your people.' },
      { icon: ChefHat, title: 'Crafted with care', text: 'A little extra love in every dish.' },
    ].map((point) => <div key={point.title} className="flex items-center gap-3 lg:border-r lg:border-border lg:last:border-0"><point.icon className="shrink-0 text-primary" size={24} strokeWidth={1.25} /><div><p className="text-[10px] font-semibold sm:text-[12px]">{point.title}</p><p className="mt-1 text-[9px] leading-relaxed text-muted-foreground sm:text-[10px]">{point.text}</p></div></div>)}</div></div>
  </section>;
};
