import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return ['/', '/menu', '/about', '/contact', '/locations'].map((path) => ({ url: new URL(path, siteUrl).toString(), changeFrequency: path === '/menu' ? 'weekly' as const : 'monthly' as const, priority: path === '/' ? 1 : path === '/menu' ? 0.9 : 0.6 }));
}
