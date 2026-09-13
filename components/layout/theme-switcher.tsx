'use client';

import { useEffect, useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { themes } from '@/config/theme';
import { restaurantConfig } from '@/config/restaurant';
import type { ThemeId } from '@/types/restaurant';

export const ThemeSwitcher = () => {
  const [selected, setSelected] = useState<ThemeId>(restaurantConfig.theme);
  const changeTheme = (id: ThemeId) => {
    setSelected(id);
    Object.entries(themes[id].tokens).forEach(([key, value]) => document.documentElement.style.setProperty(`--${key}`, value));
    try { sessionStorage.setItem(`${restaurantConfig.id}:theme`, id); } catch { /* Preview remains available. */ }
  };
  useEffect(() => { try { const saved = sessionStorage.getItem(`${restaurantConfig.id}:theme`) as ThemeId; if (saved && themes[saved]) changeTheme(saved); } catch { /* Use the configured theme. */ } }, []);
  return <div className="flex flex-wrap items-center gap-2"><span className="mr-2 flex items-center gap-1.5 text-[11px] text-contrast-foreground/60"><Palette size={13} /> Try a different flavor</span>{Object.entries(themes).map(([key, theme]) => <button key={key} type="button" onClick={() => changeTheme(key as ThemeId)} aria-pressed={selected === key} aria-label={`Switch to ${theme.name} theme`} title={theme.name} className={`flex size-7 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 ${selected === key ? 'border-contrast-foreground' : 'border-transparent'}`} style={{ backgroundColor: theme.swatch }}>{selected === key && <Check size={13} className="text-white" />}</button>)}<span aria-live="polite" className="sr-only">{themes[selected].name} theme selected</span></div>;
};
