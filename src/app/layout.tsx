import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Agency | Websites & Automation Systems That Help Businesses Grow",
  description: "Easy Agency builds modern websites and smart automation systems that help restaurants, cafés, clinics, and local businesses attract more customers, improve their online presence, and streamline their operations.",
  keywords: ["web development", "website design", "automation", "restaurant websites", "clinic websites", "business websites", "web applications", "Easy Agency", "digital solutions"],
  authors: [{ name: "Easy Agency" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Easy Agency",
    description: "Websites & Automation Systems That Help Businesses Grow",
    siteName: "Easy Agency",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Agency",
    description: "Websites & Automation Systems That Help Businesses Grow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
