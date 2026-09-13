import type { Metadata } from 'next';
import { restaurantConfig as r } from '@/config/restaurant';
import { categories } from '@/data/categories';
import { menuItems } from '@/data/menu';

export const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL) : undefined;
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${r.name}`, description, url: path, siteName: r.name, type: 'website', locale: 'en_PK', images: [{ url: r.heroImage, width: 1600, height: 1067, alt: `${r.name} Pakistani cuisine` }] },
    twitter: { card: 'summary_large_image', title: `${title} | ${r.name}`, description, images: [r.heroImage] },
  };
}
export const siteMetadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: `${r.name} | Pakistani Food in ${r.locality}, ${r.city}`, template: `%s | ${r.name}` },
  description: r.description,
  alternates: { canonical: '/' },
  robots: { index: !r.demo, follow: true },
  openGraph: { title: `${r.name} — ${r.tagline}`, description: r.description, siteName: r.name, url: '/', type: 'website', locale: 'en_PK', images: [{ url: r.heroImage, width: 1600, height: 1067, alt: `${r.name} Pakistani cuisine` }] },
  twitter: { card: 'summary_large_image', title: r.name, description: r.description, images: [r.heroImage] },
};
export function restaurantStructuredData() {
  const base = siteUrl?.origin;
  return {
    '@context': 'https://schema.org', '@type': ['Restaurant', 'LocalBusiness'],
    ...(base ? { '@id': `${base}/#restaurant`, url: base, image: new URL(r.heroImage, base).toString() } : {}),
    name: r.name, description: r.description, servesCuisine: 'Pakistani',
    address: { '@type': 'PostalAddress', addressLocality: r.locality, addressRegion: r.city, addressCountry: r.country },
    ...(r.phone ? { telephone: r.phone } : {}),
    ...(r.instagramUrl ? { sameAs: [r.instagramUrl] } : {}),
    // Never publish fictional ratings, unverified opening hours or demo prices as offers.
    hasMenu: {
      '@type': 'Menu', name: r.demo ? 'Illustrative demo menu' : `${r.name} Menu`,
      ...(base ? { url: `${base}/menu` } : {}),
      hasMenuSection: categories.map((category) => ({
        '@type': 'MenuSection', name: category.name,
        hasMenuItem: menuItems.filter((item) => item.categoryId === category.id).map((item) => ({
          '@type': 'MenuItem', name: item.name, description: item.description,
          ...(!r.demo ? { offers: { '@type': 'Offer', price: item.price, priceCurrency: r.currency } } : {}),
        })),
      })),
    },
  };
}
