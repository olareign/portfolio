import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono, Inter } from "next/font/google";
import { profile, contact } from "@/content";
import { MotionProvider } from "@/components/MotionProvider";
import { ThemeScript } from "@/components/ThemeScript";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.handle} — Subject of Interest`;
const description = `${profile.positioning}. Portfolio of ${profile.name}, based in ${profile.location}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${profile.handle}`,
  },
  description,
  keywords: [
    profile.name,
    profile.handle,
    "software engineer",
    "backend developer",
    "fullstack developer",
    "Node.js developer",
    "NestJS developer",
    "TypeScript developer",
    "Next.js developer",
    "portfolio",
  ],
  authors: [{ name: profile.name, url: contact.github }],
  creator: profile.name,
  publisher: profile.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title,
    description,
    type: "profile",
    url: SITE_URL,
    siteName: title,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  url: SITE_URL,
  jobTitle: "Software Engineer",
  description: profile.positioning,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  email: `mailto:${contact.email}`,
  sameAs: [contact.linkedin, contact.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-void text-ink font-prose">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeScript />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
