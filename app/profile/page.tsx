"use client";
import { motion } from "framer-motion";

export default function ProfilePage() {
  // In a future phase, we can fetch this from a database/session
  const user = {
    name: "ALEX NORTON",
    handle: "@NORTECH",
    memberSince: "2026",
    status: "PROVISIONAL"
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 pb-20">
      <header className="mb-12 text-center">
        <h1 className="text-zinc-500 text-[10px] tracking-[0.5em] uppercase mb-2">Member Identity</h1>
        <div className="h-1 w-12 bg-[#FF00FF] mx-auto"></div>
      </header>

      {/* The Digital Card */}
      <motion.div 
        initial={{ opacity: 0, rotateY: -20 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-sm aspect-[1.586/1] group perspective-1000"
      >
        {/* Card Body with Glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/20 p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
          
          {/* Animated Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF00FF]/20 rounded-full blur-[80px] group-hover:bg-[#FF00FF]/40 transition-colors duration-700" />
          
          <div className="flex justify-between items-start">
            <div className="font-black italic text-xl tracking-tighter">
              NATITUDE<span className="text-[#FF00FF]">.</span>
            </div>
            <div className="text-[10px] bg-white text-black px-2 py-1 font-bold rounded">
              {user.status}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light tracking-widest uppercase mb-1">{user.name}</h2>
            <p className="text-[#FF00FF] text-xs font-mono tracking-tighter">{user.handle}</p>
          </div>

          <div className="flex justify-between items-end border-t border-white/10 pt-4">
            <div>
              <p className="text-[8px] uppercase text-zinc-500 tracking-widest">Established</p>
              <p className="text-[10px] font-bold tracking-widest">{user.memberSince}</p>
            </div>
            <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center">
               <div className="h-2 w-2 bg-[#FF00FF] animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mt-12 text-zinc-600 text-[10px] uppercase tracking-[0.3em] text-center max-w-[250px] leading-loose">
        Show this card at the entrance <br /> for priority vetting.
      </p>
    </div>
  );
}