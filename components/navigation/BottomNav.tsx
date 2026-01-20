"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  console.log("Current Pathname is:", pathname);

  const navItems = [
  {
    id: "home",
    path: "/",
    label: "Home",
    svg: <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  },
  {
    id: "the-wild",
    path: "/map",
    label: "The Wild",
    svg: <path d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />,
  },
  {
    id: "join",
    path: "/join",
    label: "Join",
    isAction: true,
    svg: <path d="M12 5v14M5 12h14" />,
  },
  {
    id: "saved",
    path: "/event",
    label: "Saved",
    svg: <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />,
  },
  {
    id: "profile",
    path: "/profile",
    label: "Profile",
    svg: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  },
];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/5 px-2">
      <div className="flex h-20 items-center justify-around max-w-lg mx-auto pb-4">
        {navItems.map((item) => {
          // Logic check: does the current URL start with the item path?
          // Using startsWith handles nested routes like /profile/alex
          const isActive = item.path === "/" 
            ? pathname === "/" 
            : pathname.startsWith(item.path);
          
          if (item.isAction) {
            return (
              <Link key={item.id} href={item.path} className="relative -top-4">
                <div className="flex flex-col items-center">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                    isActive 
                      ? "bg-[#FF00FF] border-[#FF00FF] shadow-[0_0_25px_rgba(255,0,255,0.6)] scale-110" 
                      : "bg-zinc-900 border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  }`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`w-8 h-8 ${isActive ? "stroke-black" : "stroke-white"}`}>
                      {item.svg}
                    </svg>
                  </div>
                  <span className={`text-[9px] mt-1.5 font-black uppercase tracking-widest ${isActive ? "text-[#FF00FF]" : "text-white/40"}`}>
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
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive 
                    ? "stroke-[#FF00FF] scale-110 drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]" 
                    : "stroke-white/30 group-hover:stroke-white/70"
                }`}
              >
                {item.svg}
              </svg>
              {/* Active Indicator Dot */}
              <div className={`mt-2 h-1 w-1 rounded-full transition-all duration-500 ${
                isActive ? "bg-[#FF00FF] scale-150 shadow-[0_0_8px_#FF00FF]" : "bg-transparent scale-0"
              }`} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}