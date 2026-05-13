import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-blog.vercel.app"
  ),
  title: {
    default: "Jingyue Xu 的个人博客",
    template: "%s | Jingyue Xu 的个人博客",
  },
  description: "记录技术、生活和创作的个人博客。",
  openGraph: {
    title: "Jingyue Xu 的个人博客",
    description: "记录技术、生活和创作的个人博客。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jingyue Xu 的个人博客",
    description: "记录技术、生活和创作的个人博客。",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
