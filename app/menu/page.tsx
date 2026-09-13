import { Suspense } from 'react';
import { MenuExplorer } from '@/components/menu/menu-explorer';
import { SectionHeading, FinalCta } from '@/components/sections/static-sections';
import { pageMetadata } from '@/lib/seo';
import { restaurantConfig as r } from '@/config/restaurant';
export const metadata = pageMetadata('Our Menu', `Explore biryani, karahi, BBQ, handi, and more from ${r.name} in ${r.locality}. Find your favorite Pakistani flavors.`, '/menu');
const App = async ({ searchParams }: { searchParams: Promise<{ category?: string }> }) => {
  const params = await searchParams;
  return <><section className="container max-w-7xl px-5 py-14 sm:px-8 lg:py-20"><div className="mb-10"><SectionHeading eyebrow="FROM OUR KITCHEN TO YOUR TABLE" title="Follow your cravings." description="Comforting classics. Smoky favorites. Something for everyone. Every dish has a story — find yours." /></div><div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-border bg-secondary/45 px-4 py-3"><span className="rounded-sm bg-primary/10 px-2 py-1 text-[9px] font-bold tracking-wider text-primary">DEMO MENU</span><p className="text-[11px] leading-5 text-muted-foreground">Illustrative prices and portions. Food photography is representative. No orders are submitted.</p></div><Suspense fallback={<p className="py-12 text-sm text-muted-foreground">Preparing the menu…</p>}><MenuExplorer key={params.category ?? 'all'} initialCategory={params.category} /></Suspense><p className="mt-8 text-[11px] leading-6 text-muted-foreground">Prices are in {r.currency}. Please confirm ingredients, allergens, and availability with the restaurant before ordering.</p></section><FinalCta /></>;
};
export default App;
