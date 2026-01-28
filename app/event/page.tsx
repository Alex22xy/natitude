"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JoinPage from "../join/page"; 

const EVENTS = [
  {
    id: 1,
    date: "FEB 14",
    name: "Neon Velour",
    location: "Bury St Edmunds — Secret",
    status: "Invites Only",
    type: "Warehouse",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070" 
  },
  {
    id: 2,
    date: "MAR 02",
    name: "The Altar: Session I",
    location: "London — E1",
    status: "Table Access Only",
    type: "Club",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070"
  },
  {
    id: 3,
    date: "MAR 21",
    name: "Biological Evolution",
    location: "Bury St Edmunds — Vaults",
    status: "Application Open",
    type: "Underground",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?q=80&w=2070"
  }
];

export default function EventsPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [isAlreadyMember, setIsAlreadyMember] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedName = localStorage.getItem("natitude_name");
    if (savedName) setIsAlreadyMember(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black pt-32 px-6 pb-32 selection:bg-[#FF00FF]">
      
      {/* HEADER: THE RADAR */}
      <header className="mb-20">
        <motion.h2 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#FF00FF] font-bold tracking-[0.4em] uppercase text-[10px] mb-4"
        >
          The Radar
        </motion.h2>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-light tracking-tighter uppercase text-white leading-none"
        >
          Upcoming <br />
          <span className="italic font-black text-[#FF00FF]">Incidents.</span>
        </motion.h1>
      </header>

      {/* EVENTS FEED */}
      <div className="space-y-24">
        {EVENTS.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group relative flex flex-col gap-8"
          >
            {/* Image Container with Cinematic Zoom */}
            <div className="relative w-full aspect-[16/7] overflow-hidden rounded-sm border border-white/5 bg-zinc-900">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] ease-out opacity-40 group-hover:opacity-80 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              {/* Type Badge Floating on Image */}
              <div className="absolute top-4 right-4">
                 <span className="text-[8px] font-mono bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-zinc-400 uppercase tracking-widest">
                    {event.type}
                 </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 border-l-2 border-[#FF00FF]/20 pl-8 relative">
              <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-[#FF00FF] shadow-[0_0_10px_#FF00FF]" />
              
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs font-mono text-[#FF00FF]/60 font-bold">{event.date}</span>
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{event.status}</span>
              </div>
              
              <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white leading-tight mb-2 group-hover:tracking-normal transition-all duration-500">
                {event.name}
              </h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{event.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA SECTION */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 p-12 rounded-3xl bg-zinc-950 border border-white/5 text-center shadow-2xl"
      >
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-8">Missing the drop?</p>
        <button 
          onClick={() => !isAlreadyMember && setShowDrawer(true)}
          className={`group relative inline-block px-10 py-4 overflow-hidden rounded-full border transition-all ${
            isAlreadyMember 
              ? "text-zinc-600 border-zinc-800 cursor-default" 
              : "text-white border-[#FF00FF] hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]"
          }`}
        >
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">
            {isAlreadyMember ? "Registered Member" : "Request Access"}
          </span>
          {!isAlreadyMember && (
            <div className="absolute inset-0 bg-[#FF00FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          )}
        </button>
      </motion.div>

      {/* REGISTRY DRAWER */}
      <AnimatePresence>
        {showDrawer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[60]"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 h-[92vh] bg-black border-t border-white/10 rounded-t-[3rem] z-[70] overflow-y-auto"
            >
               <div className="sticky top-0 w-full flex flex-col items-center py-6 bg-black/90 backdrop-blur-md z-20">
                <button onClick={() => setShowDrawer(false)} className="h-1 w-12 bg-zinc-800 rounded-full hover:bg-[#FF00FF] transition-colors" />
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-600 mt-4">Registry Entry</span>
              </div>
              <div className="pb-24"><JoinPage /></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}