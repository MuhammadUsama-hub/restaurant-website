import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
import { restaurantConfig } from '@/config/restaurant';
export default function robots(): MetadataRoute.Robots {
  return { rules: restaurantConfig.demo ? { userAgent: '*', disallow: '/' } : { userAgent: '*', allow: '/', disallow: ['/api/', '/order'] }, ...(siteUrl ? { sitemap: new URL('/sitemap.xml', siteUrl).toString() } : {}) };
}
