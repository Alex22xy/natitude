"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JoinPage from "../join/page"; 

const EVENTS = [
  {
    id: 1,
    date: "FEB 14",
    name: "Neon Velour",
    location: "London — Secret",
    status: "Invites Only",
    type: "Warehouse",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070" 
  },
  {
    id: 2,
    date: "MAR 02",
    name: "The Altar: Session I",
    location: "Dubai — DIFC",
    status: "Table Access Only",
    type: "Club",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070"
  },
  {
    id: 3,
    date: "MAR 21",
    name: "Biological Evolution",
    location: "Miami — Wynwood",
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

  // Prevents hydration errors
  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black pt-32 px-6 pb-32">
      <header className="mb-16">
        <h2 className="text-[#FF00FF] font-bold tracking-[0.3em] uppercase text-[10px] mb-4">The Radar</h2>
        <h1 className="text-4xl font-light tracking-tighter uppercase text-white">
          Upcoming <br />
          <span className="italic font-black text-[#FF00FF]">Incidents.</span>
        </h1>
      </header>

      <div className="space-y-16">
        {EVENTS.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col gap-6"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[21/9] overflow-hidden rounded-xl border border-white/5 bg-zinc-900">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-50 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            <div className="flex-1 border-l border-white/10 pl-6 relative">
              <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-[#FF00FF]" />
              
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-zinc-500">{event.date} // {event.type}</span>
                <span className="text-[8px] border border-white/20 px-2 py-1 rounded text-zinc-400 uppercase tracking-widest">{event.status}</span>
              </div>
              
              <h3 className="text-2xl font-bold uppercase italic tracking-tighter text-white group-hover:text-[#FF00FF] transition-colors">
                {event.name}
              </h3>
              <p className="text-sm text-zinc-500 font-light">{event.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5 text-center">
        <button 
          onClick={() => !isAlreadyMember && setShowDrawer(true)}
          className={`pb-1 text-xs uppercase tracking-[0.4em] font-black italic border-b ${
            isAlreadyMember ? "text-zinc-600 border-zinc-800" : "text-white border-[#FF00FF]"
          }`}
        >
          {isAlreadyMember ? "On the list" : "Join waitlist"}
        </button>
      </div>

      <AnimatePresence>
        {showDrawer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60]"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-x-0 bottom-0 h-[92vh] bg-black border-t border-white/10 rounded-t-[3rem] z-[70] overflow-y-auto"
            >
               <div className="sticky top-0 w-full flex justify-center py-6 bg-black/80 backdrop-blur-md z-20">
                <button onClick={() => setShowDrawer(false)} className="h-1.5 w-16 bg-zinc-800 rounded-full" />
              </div>
              <div className="pb-24"><JoinPage /></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}