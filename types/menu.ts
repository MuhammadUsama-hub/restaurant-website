export interface Category { id: string; name: string; icon: string; description: string }
export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  details: string;
  price: number;
  image: string;
  portion: string;
  featured?: boolean;
  badge?: string;
  dietary: ('spicy' | 'vegetarian')[];
  allergens: string[];
  available: boolean;
}
export interface Review { id: string; name: string; initials: string; rating: number; quote: string; date: string; demo: boolean }
export interface Promotion { id: string; name: string; eyebrow: string; description: string; price: number; originalPrice: number; image: string; itemIds: { id: string; quantity: number }[]; tone: 'dark' | 'light' }
