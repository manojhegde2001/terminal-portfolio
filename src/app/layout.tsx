import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jetbrains-mono'
})

export const metadata: Metadata = {
  title: 'Manoj Hegde - Terminal Portfolio | Full Stack MERN Developer',
  description: 'Interactive terminal-style portfolio of Manoj Hegde - Full Stack MERN Developer with 2+ years experience at Invenzo Labs. Specialized in React.js, Next.js, Node.js, and MongoDB.',
  keywords: [
    'Manoj Hegde',
    'Full Stack Developer', 
    'MERN Stack Developer',
    'React.js Developer',
    'Next.js Developer',
    'Node.js Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'Portfolio',
    'Terminal Portfolio',
    'Interactive Portfolio',
    'Bengaluru Developer',
    'Invenzo Labs',
    'Frontend Developer',
    'Backend Developer',
    'MongoDB',
    'Express.js',
    'Web Developer',
    'Software Engineer'
  ],
  authors: [{ 
    name: 'Manoj Hegde',
    url: 'https://manojhegde.dev'
  }],
  creator: 'Manoj Hegde',
  publisher: 'Manoj Hegde',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://manojhegde.dev',
    title: 'Manoj Hegde - Full Stack MERN Developer | Interactive Terminal Portfolio',
    description: 'Explore my interactive terminal-style portfolio. Full Stack MERN Developer with expertise in React.js, Next.js, Node.js, and MongoDB. 2+ years experience at Invenzo Labs.',
    siteName: 'Manoj Hegde Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200&h=630&fit=crop&crop=entropy&auto=format&q=80',
        width: 1200,
        height: 630,
        alt: 'Manoj Hegde - Full Stack MERN Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manoj Hegde - Full Stack MERN Developer',
    description: 'Interactive terminal-style portfolio showcasing full-stack development expertise in MERN stack',
    images: ['https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200&h=630&fit=crop&crop=entropy&auto=format&q=80'],
    creator: '@manojhegde2001',
    site: '@manojhegde2001',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    // Using Lucide React Terminal Icon from CDN
    icon: [
      {
        url: 'https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.js',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      // Terminal emoji as fallback
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>',
        sizes: '32x32',
      },
      // Programming icons from Iconify CDN
      {
        url: 'https://api.iconify.design/vscode-icons/file-type-reactjs.svg',
        sizes: '16x16',
      },
      {
        url: 'https://api.iconify.design/vscode-icons/file-type-node.svg',
        sizes: '32x32',
      }
    ],
    shortcut: [
      {
        url: 'https://api.iconify.design/terminal/terminal.svg',
        sizes: '16x16',
      }
    ],
    apple: [
      {
        url: 'https://api.iconify.design/fluent-emoji/laptop.svg',
        sizes: '180x180',
      },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: 'https://api.iconify.design/noto/laptop.svg',
      },
      {
        rel: 'mask-icon',
        url: 'https://api.iconify.design/carbon/terminal.svg',
        color: '#00ff41',
      },
    ],
  },
  manifest: 'https://manojhegde.dev/manifest.json',
  alternates: {
    canonical: 'https://manojhegde.dev',
  },
  category: 'Portfolio',
  classification: 'Portfolio Website',
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e1e1e' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetBrainsMono.variable}>
      <head>
        {/* Additional Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Manoj Hegde" />
        <meta name="application-name" content="Manoj Hegde Portfolio" />
        <meta name="msapplication-TileColor" content="#1e1e1e" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#1e1e1e" />
        
        {/* Favicon using Iconify API - Multiple formats */}
        <link rel="icon" type="image/svg+xml" href="https://api.iconify.design/material-symbols/terminal.svg?color=%2300ff41" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://api.iconify.design/vscode-icons/file-type-node.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://api.iconify.design/vscode-icons/file-type-reactjs.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://api.iconify.design/fluent-emoji/laptop.svg" />
        <link rel="mask-icon" href="https://api.iconify.design/carbon/terminal.svg" color="#00ff41" />
        
        {/* PWA Support */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.iconify.design" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Manoj Hegde',
              jobTitle: 'Full Stack MERN Developer',
              worksFor: {
                '@type': 'Organization',
                name: 'Invenzo Labs',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Bengaluru',
                  addressRegion: 'Karnataka',
                  addressCountry: 'India'
                }
              },
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'MS Ramaiah University of Applied Sciences'
              },
              knowsAbout: ['React.js', 'Next.js', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript', 'Full Stack Development'],
              url: 'https://manojhegde.dev',
              email: 'manojhegde2001@gmail.com',
              telephone: '+91-8431029460',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bengaluru',
                postalCode: '560061',
                addressRegion: 'Karnataka',
                addressCountry: 'India'
              },
              sameAs: [
                'https://linkedin.com/in/manojhegde2001',
                'https://github.com/manojhegde2001'
              ]
            })
          }}
        />
      </head>
      <body className={jetBrainsMono.className}>
        {children}
        
        {/* Analytics and Performance Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Service Worker Registration for PWA
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
