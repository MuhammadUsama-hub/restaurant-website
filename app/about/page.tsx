import { SectionHeading, StorySection, WhyUs, FinalCta } from '@/components/sections/static-sections';
import { pageMetadata } from '@/lib/seo';
import { restaurantConfig as r } from '@/config/restaurant';
export const metadata = pageMetadata('Our Story', `Get to know the heart behind ${r.name}: authentic Pakistani flavors, comforting recipes, and neighborhood hospitality.`, '/about');
const App = () => {
  return <><section className="container max-w-7xl px-5 py-14 sm:px-8 lg:py-20"><SectionHeading centered eyebrow={`WELCOME TO ${r.shortName}`} title={'Rooted in flavor.\nMade with heart.'} description="Because food is more than what’s on your plate. It’s where we come from, who we share it with, and the memories we make." /></section><StorySection full /><WhyUs /><FinalCta /></>;
};
export default App;
