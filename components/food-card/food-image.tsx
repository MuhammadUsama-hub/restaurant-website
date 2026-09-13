'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { ChefHat } from 'lucide-react';

export const FoodImage = ({ alt, className = '', ...props }: ImageProps) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={`${alt} — photo unavailable`} className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary text-muted-foreground"><ChefHat size={38} strokeWidth={1} /><span className="px-4 text-center text-xs">{alt}</span></div>;
  return <Image {...props} alt={alt} className={`object-cover ${className}`} onError={() => setFailed(true)} />;
};
