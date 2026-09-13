import Link from 'next/link';
import { ArrowUpRight, Sparkle } from 'lucide-react';
import { Hero } from '@/components/hero/hero';
import { catalog } from '@/lib/catalog';
import { FoodCard } from '@/components/food-card/food-card';
import { MenuExplorer } from '@/components/menu/menu-explorer';
import { SectionHeading, QuickActions, StorySection, WhyUs, ReviewsSection, LocationSection, FinalCta } from '@/components/sections/static-sections';
import { Promotions } from '@/components/sections/promotions';
import { SocialGallery } from '@/components/sections/social-gallery';

const App = () => {
  return <>
    <Hero />
    <section className="container max-w-7xl px-5 pb-16 pt-16 sm:px-8 lg:pt-20"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><SectionHeading eyebrow="THE ONES YOU’LL COME BACK FOR" title="House favorites." description="A few signatures from our kitchen. A whole lot of reasons to dig in." /><Link href="/menu" className="inline-flex items-center gap-4 self-start border-b border-primary/40 pb-1.5 text-xs font-semibold text-primary sm:self-auto">Explore full menu <ArrowUpRight size={15} /></Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{catalog.getFeatured().map((item) => <FoodCard key={item.id} item={item} />)}</div><p className="mt-4 text-[10px] text-muted-foreground">A taste of the concept · Illustrative menu and prices</p></section>
    <QuickActions />
    <StorySection />
    <section id="menu" className="container max-w-7xl scroll-mt-28 px-5 py-20 sm:px-8"><div className="mb-9"><SectionHeading eyebrow="SOMETHING FOR EVERY CRAVING" title="What are you in the mood for?" description="From comforting classics to a little something different. Find your kind of delicious." /></div><MenuExplorer compact /></section>
    <section id="offers" className="scroll-mt-28 border-y border-border bg-secondary/35"><div className="container max-w-7xl px-5 py-16 sm:px-8"><div className="mb-8 flex items-end justify-between gap-4"><SectionHeading eyebrow="MORE TO LOVE" title="Good company. Great deals." /><Sparkle size={38} strokeWidth={0.7} className="hidden text-primary sm:block" /></div><Promotions /></div></section>
    <WhyUs />
    <ReviewsSection />
    <SocialGallery />
    <LocationSection />
    <FinalCta />
  </>;
};
export default App;
