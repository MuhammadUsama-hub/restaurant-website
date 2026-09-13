import type { CSSProperties } from 'react';
import type { ThemeId } from '@/types/restaurant';

export const themes: Record<ThemeId, { name: string; swatch: string; tokens: Record<string, string> }> = {
  traditional: {
    name: 'Traditional Pakistani', swatch: '#C34E24',
    tokens: {
      primary: '16 69% 43%', 'primary-foreground': '40 40% 98%',
      secondary: '35 34% 91%', 'secondary-foreground': '28 17% 15%',
      accent: '35 47% 88%', 'accent-foreground': '22 32% 25%',
      background: '40 38% 97%', foreground: '28 17% 15%',
      muted: '35 27% 92%', 'muted-foreground': '25 9% 40%',
      card: '40 43% 99%', 'card-foreground': '28 17% 15%',
      popover: '40 43% 99%', 'popover-foreground': '28 17% 15%',
      border: '32 22% 85%', input: '32 22% 82%', ring: '16 69% 43%',
      contrast: '30 15% 13%', 'contrast-foreground': '40 38% 97%',
    },
  },
  modern: {
    name: 'Modern Premium', swatch: '#BDA575',
    tokens: {
      primary: '40 45% 66%', 'primary-foreground': '30 10% 10%',
      secondary: '30 8% 18%', 'secondary-foreground': '40 22% 94%',
      accent: '32 14% 24%', 'accent-foreground': '40 35% 85%',
      background: '30 9% 11%', foreground: '40 22% 94%',
      muted: '30 8% 16%', 'muted-foreground': '35 10% 68%',
      card: '30 8% 15%', 'card-foreground': '40 22% 94%',
      popover: '30 8% 15%', 'popover-foreground': '40 22% 94%',
      border: '30 8% 26%', input: '30 8% 32%', ring: '40 45% 66%',
      contrast: '30 10% 7%', 'contrast-foreground': '40 22% 94%',
    },
  },
  'fast-food': {
    name: 'Fast Food', swatch: '#B72932',
    tokens: {
      primary: '356 65% 43%', 'primary-foreground': '0 0% 100%',
      secondary: '43 90% 86%', 'secondary-foreground': '0 12% 13%',
      accent: '43 90% 83%', 'accent-foreground': '0 12% 13%',
      background: '45 75% 97%', foreground: '0 12% 13%',
      muted: '42 50% 92%', 'muted-foreground': '20 10% 38%',
      card: '0 0% 100%', 'card-foreground': '0 12% 13%',
      popover: '0 0% 100%', 'popover-foreground': '0 12% 13%',
      border: '38 30% 83%', input: '38 30% 80%', ring: '356 65% 43%',
      contrast: '0 12% 13%', 'contrast-foreground': '45 75% 97%',
    },
  },
};
export const designTokens = { radius: '0.5rem', shadow: '0 18px 60px -22px rgba(50, 34, 18, 0.25)', container: '1280px', spacing: '1.5rem' };
export function getThemeStyle(id: ThemeId): CSSProperties {
  return Object.fromEntries([
    ...Object.entries(themes[id].tokens).map(([key, value]) => [`--${key}`, value]),
    ['--radius', designTokens.radius], ['--shadow-editorial', designTokens.shadow],
    ['--container-width', designTokens.container], ['--section-gap', designTokens.spacing],
  ]) as CSSProperties;
}
