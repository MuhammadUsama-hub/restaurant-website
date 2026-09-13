import { SectionHeading, LocationSection, FinalCta } from '@/components/sections/static-sections';
import { pageMetadata } from '@/lib/seo';
import { restaurantConfig as r } from '@/config/restaurant';
export const metadata = pageMetadata('Find Us', `Discover ${r.name} in ${r.locality}, ${r.city}. See neighborhood information and opening hours.`, '/locations');
const App = () => {
  return <><section className="container max-w-7xl px-5 py-14 sm:px-8"><SectionHeading centered eyebrow="YOUR NEIGHBORHOOD KITCHEN" title="There’s a place for you here." description={`Find your next favorite meal in the heart of ${r.locality}. Bring your people. We’ll bring the flavor.`} /></section><LocationSection page /><FinalCta /></>;
};
export default App;
