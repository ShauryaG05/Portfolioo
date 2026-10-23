import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const socialImage = siteUrl ? new URL("/images/shaurya-halftone-portrait.webp", siteUrl).toString() : undefined;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  title: "Shaurya Gupta — Portfolio",
  description: "Portfolio of Shaurya Gupta. Full Stack Developer, Backend Engineer, Ai engineer.",
  applicationName: "Shaurya Gupta Portfolio",
  openGraph: {
    title: "Shaurya Gupta — Portfolio",
    description: "Full Stack Developer · Backend Engineer · Ai engineer",
    type: "website",
    ...(socialImage
      ? {
          images: [
            {
              url: socialImage,
              width: 1190,
              height: 1322,
              alt: "Gold halftone portrait artwork of Shaurya Gupta",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaurya Gupta — Portfolio",
    description: "Full Stack Developer · Backend Engineer · Ai engineer",
    ...(socialImage ? { images: [socialImage] } : {}),
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

