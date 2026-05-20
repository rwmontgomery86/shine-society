import type { Metadata } from "next";
import { Bebas_Neue, Caveat, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const caveat = Caveat({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Shine Society Detailing — Senoia, GA",
  description:
    "Mobile detailing built on convenience, quality, and attention to detail. Restored, protected, elevated — without leaving your driveway. Serving Senoia, Newnan, Peachtree City, Fayetteville & Griffin.",
  openGraph: {
    title: "Shine Society Detailing",
    description:
      "Mobile detailing in Senoia, GA. Ceramic coating, paint correction, and full-service interior & exterior detail — we come to you.",
    url: "/",
    siteName: "Shine Society Detailing",
    images: [{ url: "/hero.jpg", width: 1024, height: 1536 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shine Society Detailing",
    description:
      "Mobile detailing in Senoia, GA. We come to you.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${bebas.variable} ${caveat.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
