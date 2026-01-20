"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      id: "choose1",
      path: "/",
      label: "Home",
      svg: <path d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />,
    },
    {
      id: "choose2",
      path: "/map",
      label: "Search",
      svg: <path d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />,
    },
    // The "JOIN" Button (Center Action)
    {
      id: "join",
      path: "/join",
      label: "Join",
      isAction: true,
      svg: (
        <path d="M12 5v14M5 12h14" strokeWidth="3" /> // Thicker Plus Icon
      ),
    },
    {
      id: "choose3",
      path: "/event",
      label: "Saved",
      svg: <path d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z" />,
    },
    {
      id: "choose4",
      path: "/profile",
      label: "Profile",
      svg: <path d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl px-2">
      <div className="flex h-16 items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          if (item.isAction) {
            return (
              <Link key={item.id} href={item.path} className="relative -top-2">
                <div className="flex flex-col items-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all shadow-[0_0_15px_rgba(255,0,255,0.2)] ${
                    isActive ? "bg-[#FF00FF] border-[#FF00FF]" : "bg-transparent border-white/20"
                  }`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`w-7 h-7 ${isActive ? "stroke-black" : "stroke-white"}`}>
                      {item.svg}
                    </svg>
                  </div>
                  <span className={`text-[10px] mt-1 font-bold uppercase tracking-tighter ${isActive ? "text-[#FF00FF]" : "text-white/40"}`}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          }

          return (
            <Link key={item.id} href={item.path} className="flex flex-col items-center justify-center w-full group">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                className={`w-6 h-6 transition-all ${
                  isActive ? "stroke-[#FF00FF] scale-110 drop-shadow-[0_0_5px_#FF00FF]" : "stroke-white/40 group-hover:stroke-white/70"
                }`}
              >
                {item.svg}
              </svg>
              <div className={`mt-1 h-1 w-1 rounded-full ${isActive ? "bg-[#FF00FF]" : "bg-transparent"}`} />
            </Link>
          );
        })}
      </div>
      {/* Safe Area for iPhone 16 Pro Max */}
      <div className="h-6" />
    </nav>
  );
}