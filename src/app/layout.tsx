import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Snoutify - Customer and Pet Management",
  description: "Manage customers and their pets with ease. Search, filter, and organize your customer database with support for multiple pet species including dogs, cats, birds, hamsters, and rats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`m-[54px] ${inter.variable} bg-gradient-to-br from-gray-100 to-gray-200/80 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
