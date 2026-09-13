import type { Promotion } from '@/types/menu';
export const promotions: Promotion[] = [
  { id: 'family-table', name: 'The family table.', eyebrow: 'BETTER TOGETHER', description: 'Chicken karahi, 2 biryanis, 2 chicken tikkas & 4 fresh mint lemonades. A feast worth sharing.', price: 3200, originalPrice: 3600, image: '/images/handi.jpg', itemIds: [{ id: 'chicken-karahi', quantity: 1 }, { id: 'chicken-biryani', quantity: 2 }, { id: 'chicken-tikka', quantity: 2 }, { id: 'mint-lemonade', quantity: 4 }], tone: 'dark' },
  { id: 'biryani-break', name: 'A biryani kind of day.', eyebrow: 'YOUR LUNCH, SORTED', description: '2 chicken biryanis & 2 fresh mint lemonades. Take a delicious break from the everyday.', price: 950, originalPrice: 1100, image: '/images/biryani-alt.jpg', itemIds: [{ id: 'chicken-biryani', quantity: 2 }, { id: 'mint-lemonade', quantity: 2 }], tone: 'light' },
];
