import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/navigation/bottomnav";

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
        {/* Minimalist Glass Header */}
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-8 pointer-events-none">
          <div className="pointer-events-auto font-black text-2xl tracking-tighter uppercase">
            NATITUDE<span className="text-[#FF00FF]">.</span>
          </div>
          <div className="pointer-events-auto">
            <span className="text-[10px] tracking-[0.4em] uppercase opacity-40 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10">
              The Wild — 2026
            </span>
          </div>
        </header>

        {/* Padding-bottom 'pb-24' ensures content clears the BottomNav */}
        <main className="relative pb-24">
          {children}
        </main>

        <BottomNav />
      </body>
    </html>
  );
}