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
        
        {/* Header removed for a cinematic, full-screen experience.
            The 'pb-24' on <main> ensures content doesn't get hidden 
            behind the BottomNav on longer pages.
        */}
        <main className="relative pb-24">
          {children}
        </main>

        <BottomNav />
      </body>
    </html>
  );
}