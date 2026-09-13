import { restaurantConfig } from '@/config/restaurant';
export function formatPrice(value: number): string {
  const amount = new Intl.NumberFormat(restaurantConfig.locale, { maximumFractionDigits: 0 }).format(value);
  return restaurantConfig.currency === 'PKR' ? `Rs. ${amount}` : new Intl.NumberFormat(restaurantConfig.locale, { style: 'currency', currency: restaurantConfig.currency, maximumFractionDigits: 0 }).format(value);
}
