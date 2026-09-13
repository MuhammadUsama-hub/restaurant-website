'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Instagram, MessageSquare, ArrowRight } from 'lucide-react';
import { restaurantConfig as r } from '@/config/restaurant';
import { Button, Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui-kit';

type ActionKind = 'phone' | 'maps' | 'instagram' | 'reviews';
const details = {
  phone: { title: 'Let’s get in touch.', description: 'The restaurant’s verified phone number hasn’t been added to this demo yet. We won’t send you to an unverified number.', icon: Phone },
  maps: { title: 'Find us in the neighborhood.', description: 'This concept is set in the neighborhood below. The exact street address and verified map pin still need to be confirmed before directions can be enabled.', icon: MapPin },
  instagram: { title: 'Fresh from the kitchen.', description: 'These photos are a curated preview. A verified restaurant Instagram account hasn’t been connected to this demo yet.', icon: Instagram },
  reviews: { title: 'A taste of the experience.', description: 'The testimonials shown here are clearly marked fictional examples for this website concept, not verified customer reviews. A real review link can be added in the restaurant configuration.', icon: MessageSquare },
};
export const ContactAction = ({ kind, children, className = '' }: { kind: ActionKind; children: ReactNode; className?: string }) => {
  const [open, setOpen] = useState(false);
  const href = kind === 'phone' ? (r.phone ? `tel:${r.phone}` : null) : kind === 'maps' ? r.googleMapsUrl : kind === 'instagram' ? r.instagramUrl : r.reviewsUrl;
  const info = details[kind];
  if (href) return <a href={href} target={kind === 'phone' ? undefined : '_blank'} rel={kind === 'phone' ? undefined : 'noopener noreferrer'} className={className}>{children}</a>;
  return <><button type="button" onClick={() => setOpen(true)} className={className}>{children}</button><Dialog open={open} onOpenChange={setOpen}><DialogContent className="w-[calc(100%-2rem)] rounded-lg p-7 sm:p-9"><span className="mb-2 flex size-12 items-center justify-center rounded-full bg-secondary text-primary"><info.icon size={23} strokeWidth={1.5} /></span><DialogTitle className="font-serif text-2xl font-medium">{info.title}</DialogTitle><DialogDescription className="leading-7">{info.description}</DialogDescription>{kind === 'maps' && <p className="border-l-2 border-primary py-2 pl-4 text-sm">{r.address}</p>}<p className="text-[11px] text-muted-foreground">Independent restaurant website concept · Demo content</p><Button asChild className="mt-2 h-11"><Link href="/menu" onClick={() => setOpen(false)}>Explore the demo menu <ArrowRight size={16} /></Link></Button></DialogContent></Dialog></>;
};
