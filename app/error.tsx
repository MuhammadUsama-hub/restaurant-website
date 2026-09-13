'use client';
import { Button } from '@/components/ui-kit';
const App = ({ reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return <section className="container max-w-xl px-5 py-24 text-center"><p className="mb-4 text-[10px] tracking-[0.18em] text-primary">A SMALL KITCHEN HICCUP</p><h1 className="font-serif text-4xl">Let’s try that again.</h1><p className="mt-5 text-sm leading-7 text-muted-foreground">This page couldn’t be prepared right now. Your bag is saved on this device when browser storage is available.</p><Button onClick={reset} className="mt-7 h-12">Try again</Button></section>;
};
export default App;
