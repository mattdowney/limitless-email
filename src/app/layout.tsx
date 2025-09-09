import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./fonts.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://limitless.email'),
  title: {
    default: "Limitless - Unlimited Email Design | One Low Monthly Rate",
    template: "%s | Limitless"
  },
  description: "Get unlimited email design requests and revisions for 70% less than the cost of a full-time designer. Professional email design on demand.",
  keywords: [
    "email design", "email marketing", "unlimited design", "email templates", 
    "marketing design", "email campaigns", "responsive email", "email automation",
    "email design service", "subscription design", "marketing agency", "email strategy"
  ],
  authors: [{ name: "Limitless Design Team", url: "https://limitless.email" }],
  creator: "Limitless",
  publisher: "Limitless",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://limitless.email",
    siteName: "Limitless",
    title: "Limitless - Unlimited Email Design",
    description: "Get unlimited email design requests and revisions for 70% less than the cost of a full-time designer.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Limitless Email Design - Unlimited Design Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@limitlesshq",
    creator: "@limitlesshq",
    title: "Limitless - Unlimited Email Design",
    description: "Get unlimited email design requests and revisions for 70% less than the cost of a full-time designer.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://limitless.email",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
