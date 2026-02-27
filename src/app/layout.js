import './globals.css';
import { cookies } from 'next/headers';
import Providers from './providers';

export const metadata = {
  title: { default: 'Taghche', template: '%s | Taghche' },
  description: 'Taghche — a leading Persian e-book and audiobook store.',
  keywords: ['Taghche', 'ebooks', 'audiobooks', 'Persian books', 'digital library'],
  openGraph: {
    title: 'Taghche',
    description: 'Taghche — a leading Persian e-book and audiobook store.',
    siteName: 'Taghche',
    type: 'website',
    // url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    // images: [
    //   {
    //     url: '/og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Taghche — ebooks and audiobooks'
    //   }
    // ]
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Taghche',
  //   description: 'Taghche — a leading Persian e-book and audiobook store.'
  // },
  robots: {
    index: true,
    follow: true
  },
  // alternates: {
  //   canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  //   languages: {
  //     'en-US': '/',
  //     'fa-IR': '/fa'
  //   }
  // }
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const savedLang = cookieStore.get('local')?.value || 'en';

  return (
    <html lang={savedLang} dir={savedLang === 'fa' ? 'rtl' : 'ltr'}>
      <body className="antialiased bg-white text-gray-900">
        <Providers lang={savedLang}>
          {children}
        </Providers>
      </body>
    </html>
  );
}