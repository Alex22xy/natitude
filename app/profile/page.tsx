"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";

export default function ProfilePage() {
  // 1. Initialize with null so we know if a user is actually there
  const [user, setUser] = useState<{ name: string | null; handle: string | null }>({ name: null, handle: null });
  const [memberId, setMemberId] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 2. Remove the "Member" and "@ACCESS" fallbacks
    const name = localStorage.getItem("natitude_name");
    const handle = localStorage.getItem("natitude_handle");
    
    if (name) {
      setUser({ name, handle });
      setMemberId(`NTD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
    }
    setIsLoaded(true);
  }, []);

  const downloadCard = async () => {
    if (cardRef.current === null || !user.name) return;
    const dataUrl = await toPng(cardRef.current, { cacheBust: true });
    const link = document.createElement("a");
    link.download = `NATITUDE-PASS-${user.name.replace(/\s+/g, "-")}.png`;
    link.href = dataUrl;
    link.click();
  };

  // 3. Prevent flickering while checking storage
  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 pt-12 pb-24">
      {user.name ? (
        <>
          {/* CARD CONTAINER (Only shows if user exists) */}
          <div ref={cardRef} className="p-4 bg-black">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-sm aspect-[1.6/1] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-white/20 rounded-2xl p-8 overflow-hidden shadow-[0_20px_50px_rgba(255,0,255,0.1)]"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF00FF]/20 blur-[60px] rounded-full" />
              
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
                    <span className="text-[7px] text-zinc-400 font-black tracking-[0.4em] uppercase">Verified Registry</span>
                  </div>
                  <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none mb-1">
                    {user.name}
                  </h2>
                  <p className="text-[#FF00FF] text-[9px] font-mono tracking-[0.2em]">{user.handle}</p>
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <div>
                    <p className="text-zinc-600 text-[7px] uppercase tracking-widest mb-1">Member ID</p>
                    <p className="text-white font-mono text-[12px] tracking-tighter">{memberId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-600 text-[7px] uppercase tracking-widest mb-1">Issued</p>
                    <p className="text-white font-mono text-[12px] tracking-tighter">JAN 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ACTIONS */}
          <div className="mt-10 w-full max-w-sm space-y-3">
            <button 
              onClick={downloadCard}
              className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#FF00FF] hover:text-white transition-all active:scale-95 shadow-xl"
            >
              Download Member Pass
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-zinc-900/30 border border-white/5 rounded-xl text-center">
                <p className="text-zinc-600 text-[7px] uppercase tracking-widest mb-1">Status</p>
                <p className="text-white text-[9px] font-black uppercase">Tier 1 Unlocked</p>
              </div>
              <div className="p-4 bg-zinc-900/30 border border-white/5 rounded-xl text-center">
                <p className="text-zinc-600 text-[7px] uppercase tracking-widest mb-1">Perks</p>
                <p className="text-white text-[9px] font-black uppercase">Entry + Shot</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* EMPTY STATE: Shows if no one is logged in */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
           <h2 className="text-zinc-800 text-[10px] font-black uppercase tracking-[0.5em] mb-6">No Registry Found</h2>
           <a href="/join" className="px-8 py-4 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#FF00FF] transition-all">
             Apply for Access
           </a>
        </motion.div>
      )}

      <p className="mt-12 text-[7px] text-zinc-700 text-center uppercase tracking-[0.5em] leading-loose">
        Digital ID: Encrypted & Private<br/>Presentation required at entry
      </p>
    </div>
  );
}