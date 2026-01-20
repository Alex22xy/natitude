import './globals.css'
import BottomNav from '@/components/navigation/BottomNav'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased pb-24">
        {children}
        <BottomNav />
      </body>
    </html>
  )
}