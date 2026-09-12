import type { Metadata, Viewport } from 'next'
import { Fraunces, Geist, Geist_Mono, Amiri, Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Grain from '@/components/Grain'
import SmoothScroll from '@/components/SmoothScroll'
import AppleFeel from '@/components/AppleFeel'
import HtmlDir from '@/components/HtmlDir'
import { CurrencyProvider } from '@/lib/currency'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic'],
  variable: '--font-amiri',
  weight: ['400', '700'],
  display: 'swap',
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  weight: ['400', '500', '700'],
  display: 'swap',
})

// Fallback global — chaque route surchargée via buildMetadata() dans /lib/seo.ts.
// metadataBase permet à Next de résoudre les URLs absolues Open Graph.
export const metadata: Metadata = {
  metadataBase: new URL('https://midnight-minuit.ma'),
  title: {
    default: 'Location de motos et scooters à Marrakech | Minuit Midnight',
    template: '%s | Minuit Midnight',
  },
  description:
    'Location de scooters et motos neufs à Marrakech depuis 2003. Livraison au riad ou à l’hôtel. Réservez sur WhatsApp.',
  applicationName: 'Minuit Midnight',
  authors: [{ name: 'Minuit Midnight' }],
  creator: 'Minuit Midnight',
  publisher: 'Minuit Midnight',
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  // Google Search Console — validation propriété
  verification: {
    google: 'm2JlsYbgFagY8ZqSxm71TSzt3_HNhJ_kR0cJf-tK6-A',
  },
}

// Barre iOS/Android : ink (haut de page = hero warm), la barre s'accorde à
// l'entrée du site. En bas c'est midnight, mais la théorie du theme-color
// prend une seule valeur — on cale sur le haut (ink chocolat).
export const viewport: Viewport = {
  themeColor: '#2A1912',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} ${amiri.variable} ${notoSansArabic.variable}`}
    >
      <body className="bg-ink text-cream">
        <CurrencyProvider>
          <HtmlDir />
          <SmoothScroll />
          <AppleFeel />
          <Grain />
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  )
}
