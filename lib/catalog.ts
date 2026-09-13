import { menuItems } from '@/data/menu';
import { categories } from '@/data/categories';
import { promotions } from '@/data/promotions';
import type { MenuItem } from '@/types/menu';
// Replace this static repository with a tenant-scoped database adapter later.
export const catalog = {
  getItems: () => menuItems,
  getCategories: () => categories,
  getFeatured: () => menuItems.filter((item) => item.featured),
  getItem: (id: string): MenuItem | undefined => {
    const item = menuItems.find((entry) => entry.id === id);
    if (item) return item;
    const offer = promotions.find((entry) => entry.id === id);
    if (!offer) return undefined;
    return { id: offer.id, categoryId: 'deals', name: offer.name.replace(/\.$/, ''), description: offer.description, details: offer.description, price: offer.price, image: offer.image, portion: 'Complete meal deal', dietary: [], allergens: ['See included dishes for allergens'], available: true };
  },
};
