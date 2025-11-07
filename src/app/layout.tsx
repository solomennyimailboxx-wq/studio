import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Odesa Auto | Професійний кузовний ремонт та фарбування в Одесі',
  description: 'Експертні послуги з рихтування, фарбування, полірування та видалення вм\'ятин (PDR) в Одесі. Гарантія якості, комп\'ютерний підбір фарби, керамічний захист. Розрахуйте вартість онлайн!',
  keywords: 'кузовний ремонт Одеса, фарбування авто Одеса, рихтування авто, полірування авто, видалення вм\'ятин без фарбування, pdr Одеса, ремонт бампера, кераміка на авто',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth dark">
      <body className={`${inter.variable} font-sans bg-black antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
