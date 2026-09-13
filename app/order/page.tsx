import { Checkout } from '@/components/cart/checkout';
import { pageMetadata } from '@/lib/seo';
export const metadata = { ...pageMetadata('Your Order', 'Review your favorite dishes and explore the local demo checkout experience.', '/order'), robots: { index: false, follow: true } };
const App = () => {
  return <section className="container max-w-6xl px-5 py-12 sm:px-8 lg:py-16"><Checkout /></section>;
};
export default App;
