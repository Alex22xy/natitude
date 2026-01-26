"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
  const [userData, setUserData] = useState({ 
    name: "", 
    handle: "", 
    isMember: false,
    loading: true 
  });

  useEffect(() => {
    // Attempt to retrieve the private local data
    const savedName = localStorage.getItem("natitude_name");
    const savedHandle = localStorage.getItem("natitude_handle");
    
    if (savedName && savedHandle) {
      setUserData({ 
        name: savedName, 
        handle: savedHandle, 
        isMember: true,
        loading: false 
      });
    } else {
      setUserData(prev => ({ ...prev, loading: false }));
    }
  }, []);

  if (userData.loading) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 pb-32">
      {/* Privacy Indicator */}
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-3"
        >
          <div className={`h-1 w-1 rounded-full ${userData.isMember ? "bg-[#FF00FF] animate-pulse" : "bg-zinc-800"}`} />
          <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">
            {userData.isMember ? "Secure Digital Identity" : "Identity Unverified"}
          </span>
        </motion.div>
      </div>

      {/* The Stealth Pass Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-sm aspect-[1.586/1] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/5 bg-zinc-950"
      >
        <div className="absolute inset-0 px-8 py-10 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            <span className="font-black italic text-2xl tracking-tighter text-white">
              NATITUDE<span className="text-[#FF00FF]">.</span>
            </span>
            <div className="border border-white/10 text-zinc-600 px-3 py-1 rounded-full text-[7px] font-black tracking-[0.2em] uppercase backdrop-blur-md">
              {userData.isMember ? "Private Pass" : "Inactive"}
            </div>
          </div>

          <div>
            <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-700 mb-1.5 font-bold">Authorized Holder</p>
            <h2 className="text-3xl font-light tracking-[0.1em] text-white uppercase truncate">
              {userData.isMember ? userData.name : "Guest User"}
            </h2>
            <p className="text-[#FF00FF] font-mono text-[10px] mt-1 opacity-80 italic">
              {userData.isMember ? userData.handle : "@anonymous"}
            </p>
          </div>

          <div className="flex justify-between items-end border-t border-white/5 pt-6">
            <div className="space-y-1">
              <p className="text-[7px] uppercase tracking-[0.3em] text-zinc-800 font-black">Status</p>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest">
                {userData.isMember ? "In Review" : "Pending Application"}
              </p>
            </div>
            <div className="text-[7px] uppercase tracking-[0.3em] text-zinc-800 text-right">
              Est. 2026 <br /> © The Wild
            </div>
          </div>
        </div>

        {/* Subtle internal glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      </motion.div>

      {/* Dynamic CTA */}
      {!userData.isMember ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Link href="/join" className="mt-16 group flex flex-col items-center">
            <span className="text-white text-[10px] uppercase tracking-[0.5em] mb-2 group-hover:text-[#FF00FF] transition-colors">Apply for Access</span>
            <div className="h-px w-12 bg-[#FF00FF]/30 group-hover:w-24 transition-all duration-500" />
          </Link>
        </motion.div>
      ) : (
        <p className="mt-16 text-zinc-600 text-[9px] leading-relaxed uppercase tracking-[0.4em] text-center max-w-[280px]">
          Identity encrypted on-device. <br /> No public record exists.
        </p>
      )}
    </div>
  );
}