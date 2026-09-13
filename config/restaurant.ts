import type { RestaurantConfig } from '@/types/restaurant';

// The single source of restaurant identity. Unknown business details stay null.
// Replace demo content and verify business information before using commercially.
export const restaurantConfig: RestaurantConfig = {
  id: 'mr-bawarchi-demo',
  name: 'Mr Bawarchi',
  shortName: 'MR BAWARCHI',
  logo: null,
  tagline: 'Made with heart. Served with love.',
  description: 'Discover the comforting flavors of Pakistani cooking at Mr Bawarchi in Gulshan-e-Maymar, Karachi. Explore biryani, sizzling karahi, smoky BBQ, and more.',
  cuisine: 'Authentic Pakistani cuisine',
  locality: 'Gulshan-e-Maymar',
  city: 'Karachi',
  country: 'PK',
  address: 'Gulshan-e-Maymar, Karachi, Pakistan',
  phone: null,
  googleMapsUrl: null,
  instagramUrl: null,
  reviewsUrl: null,
  heroImage: '/images/biryani.jpg',
  storyImage: '/images/handi.jpg',
  currency: 'PKR',
  locale: 'en-PK',
  theme: 'traditional',
  demo: true,
  business: {
    deliveryAvailable: true,
    takeawayAvailable: true,
    dineInAvailable: true,
    openingHours: [
      { days: 'Monday – Thursday', hours: '12:00 PM – 12:00 AM', verified: false },
      { days: 'Friday – Sunday', hours: '12:00 PM – 1:00 AM', verified: false },
    ],
  },
  content: {
    announcement: 'GOOD FOOD. GOOD COMPANY. GREAT MEMORIES.',
    hero: {
      eyebrow: 'AUTHENTIC PAKISTANI CUISINE',
      title: 'A little spice.',
      accent: 'A lot of soul.',
      description: 'From the first fragrant spoonful of biryani to the last bite of smoky BBQ. This is comfort food, the Pakistani way.',
      note: 'Your next favorite meal is right here.',
    },
    story: {
      eyebrow: 'OUR KITCHEN. OUR STORY.',
      title: 'Good food brings\nus together.',
      paragraphs: [
        'Some of the best memories begin around a table. A karahi still sizzling, biryani being passed around, and the people you love asking for just one more bite.',
        'That is the feeling behind our kitchen. Pakistani recipes, thoughtfully chosen ingredients, and food made with the kind of care you can taste. A little taste of home, right here in your neighborhood.',
      ],
      signature: 'From our kitchen, with love.',
    },
    finalCta: { title: 'Come hungry.\nLeave happy.', description: 'Your favorites are just a few taps away. Let’s make it a delicious day.' },
  },
};
