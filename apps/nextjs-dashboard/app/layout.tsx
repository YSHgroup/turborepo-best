import '@/app/ui/global.css'
import { inter } from './ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  keywords: 'Next.js tutorial, Next.js dashboard, Next.js app router',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-tutorial-yshgroup.vercel.app'),
  authors: [{name: 'David Wilson', url:'https://github.com/YSHgroup'}],
  openGraph: {
    title: 'Acme Dashboard',
    description: 'The official Next.js Learn Dashboard built with App Router.',
    url: 'https://next-tutorial-yshgroup.vercel.app',
    type: 'website',
  },
  twitter: {
    site: '@acme',
    description:'The official Next.js Learn Dashboard built with App Router.',
    title:'Acme Dashboard'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
