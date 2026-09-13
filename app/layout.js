import './globals.css';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import { AppProviders } from '@/components/layout/app-providers';
import { Header } from '@/components/navigation/header';
import { Footer } from '@/components/layout/footer';
import { restaurantConfig } from '@/config/restaurant';
import { getThemeStyle } from '@/config/theme';
import { siteMetadata, restaurantStructuredData } from '@/lib/seo';

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const serif = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--font-playfair', display: 'swap' });
export const metadata = siteMetadata;

const App = ({ children }) => {
  return (
    <html lang="en" style={getThemeStyle(restaurantConfig.theme)} className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/15 selection:text-foreground motion-reduce:[&_*]:!animate-none motion-reduce:[&_*]:!transition-none">
        <a href="#main-content" className="sr-only z-[100] rounded-md bg-primary px-5 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <AppProviders>
          <Header />
          <main id="main-content" className="min-h-[45vh]">{children}</main>
          <Footer />
        </AppProviders>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantStructuredData()).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
};
export default App;