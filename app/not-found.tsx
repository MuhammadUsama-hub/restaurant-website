import Link from 'next/link';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui-kit';
const App = () => {
  return <section className="container max-w-xl px-5 py-24 text-center"><UtensilsCrossed size={40} strokeWidth={1.3} className="mx-auto mb-7 text-primary" /><p className="mb-3 text-[10px] tracking-[0.2em] text-primary">404 · A LITTLE OFF THE MENU</p><h1 className="font-serif text-4xl">This table is empty.</h1><p className="mt-5 text-sm leading-7 text-muted-foreground">The page you’re looking for isn’t here. But something delicious is just around the corner.</p><Button asChild className="mt-7 h-12"><Link href="/">Back to the kitchen <ArrowRight size={16} /></Link></Button></section>;
};
export default App;
