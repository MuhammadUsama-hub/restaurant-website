import Image from 'next/image';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';
import { restaurantConfig as r } from '@/config/restaurant';

export const Brand = ({ light = false }: { light?: boolean }) => {
  return <Link href="/" aria-label={`${r.name} home`} className={`inline-flex shrink-0 items-center gap-2.5 ${light ? 'text-contrast-foreground' : 'text-foreground'}`}>
    {r.logo ? <Image src={r.logo} alt="" width={44} height={44} className="object-contain" /> : <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"><ChefHat size={28} strokeWidth={1.4} /></span>}
    <span><span className="block text-[17px] font-extrabold leading-tight tracking-[0.025em]">{r.shortName}</span><span className={`mt-1 block text-[8px] font-medium tracking-[0.22em] ${light ? 'text-contrast-foreground/60' : 'text-muted-foreground'}`}>{r.cuisine.toUpperCase()}</span></span>
  </Link>;
};
