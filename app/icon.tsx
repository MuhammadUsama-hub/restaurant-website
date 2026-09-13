import { ImageResponse } from 'next/og';
import { restaurantConfig } from '@/config/restaurant';
import { themes } from '@/config/theme';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';
export default function Icon() {
  const initials = restaurantConfig.name.split(' ').map((part) => part[0]).slice(0, 2).join('');
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 14, background: themes[restaurantConfig.theme].swatch, color: 'white', fontSize: 29, fontWeight: 700 }}>{initials}</div>, size);
}
