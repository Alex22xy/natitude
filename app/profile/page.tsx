"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [user, setUser] = useState({ name: "", handle: "" });
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    // Pull the data we saved during signup
    const name = localStorage.getItem("natitude_name") || "Guest";
    const handle = localStorage.getItem("natitude_handle") || "@MEMBER";
    setUser({ name, handle });
    
    // Generate a consistent "Fake" Member ID for the aesthetic
    setMemberId(`NTD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF00FF]/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-sm aspect-[1.6/1] bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl"
      >
        {/* CARD DESIGN ELEMENTS */}
        <div className="absolute top-0 right-0 p-6 opacity-20">
          <div className="w-12 h-12 border-2 border-[#FF00FF] rounded-full" />
        </div>

        <div className="h-full flex flex-col justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] text-zinc-500 font-black tracking-[0.3em] uppercase">Active Member</span>
            </div>
            <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">
              {user.name}
            </h2>
            <p className="text-[#FF00FF] text-[10px] font-mono tracking-widest">{user.handle}</p>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-zinc-600 text-[8px] uppercase tracking-widest mb-1">Access Credentials</p>
              <p className="text-white font-mono text-sm tracking-tighter">{memberId}</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-600 text-[8px] uppercase tracking-widest mb-1">Registry Year</p>
              <p className="text-white font-mono text-sm tracking-tighter">2026</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ADDITIONAL INFO */}
      <div className="mt-12 w-full max-w-sm space-y-4">
        <div className="p-4 border border-zinc-900 rounded-xl flex justify-between items-center">
          <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Event Perks</span>
          <span className="text-white text-[10px] font-black italic uppercase">Tier 1 Unlocked</span>
        </div>
        
        <button className="w-full py-4 bg-zinc-900/50 border border-white/5 text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors">
          View Upcoming Private Events
        </button>
      </div>

      <p className="mt-8 text-[7px] text-zinc-700 uppercase tracking-[0.4em]">
        Non-Transferable Identity Card
      </p>
    </div>
  );
}