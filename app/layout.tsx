import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "../components/navigation/bottomnav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Natitude | The Wild",
  description: "Ultra-Premium Nightlife & Lifestyle Brand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.className} text-white antialiased`}>
        <div className="grain-overlay" /> {/* The grain layer */}
        <main className="relative pb-24">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}