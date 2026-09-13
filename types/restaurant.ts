export type ThemeId = 'traditional' | 'modern' | 'fast-food';
export interface RestaurantConfig {
  id: string;
  name: string;
  shortName: string;
  logo: string | null;
  tagline: string;
  description: string;
  cuisine: string;
  locality: string;
  city: string;
  country: string;
  address: string;
  phone: string | null;
  googleMapsUrl: string | null;
  instagramUrl: string | null;
  reviewsUrl: string | null;
  heroImage: string;
  storyImage: string;
  currency: string;
  locale: string;
  theme: ThemeId;
  demo: boolean;
  business: {
    deliveryAvailable: boolean;
    takeawayAvailable: boolean;
    dineInAvailable: boolean;
    openingHours: { days: string; hours: string; verified: boolean }[];
  };
  content: {
    announcement: string;
    hero: { eyebrow: string; title: string; accent: string; description: string; note: string };
    story: { eyebrow: string; title: string; paragraphs: string[]; signature: string };
    finalCta: { title: string; description: string };
  };
}
