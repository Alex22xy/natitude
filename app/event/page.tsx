"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JoinPage from "../join/page"; 

interface ClubEvent {
  id: number;
  targetDate?: string;
  date: string;
  name: string;
  location: string;
  status: string;
  type: string;
  image: string;
}

const EVENTS: ClubEvent[] = [
  {
    id: 1,
    targetDate: "2026-02-14T22:00:00", 
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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const savedName = localStorage.getItem("natitude_name");
    if (savedName) setIsAlreadyMember(true);

    const firstEventDate = EVENTS[0]?.targetDate;
    if (!firstEventDate) return;

    const timer = setInterval(() => {
      const target = new Date(firstEventDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Haptic Feedback Function
  const triggerHaptic = () => {
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10); 
    }
  };

  const handleJoinClick = () => {
    triggerHaptic();
    if (!isAlreadyMember) setShowDrawer(true);
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black pt-24 px-6 pb-40 selection:bg-[#FF00FF]">
      
      {/* 01. CENTERED LIVE COUNTDOWN */}
      <div className="w-full flex justify-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-2 w-full max-w-[340px]"
        >
          {[
            { label: "Days", val: timeLeft.days },
            { label: "Hrs", val: timeLeft.hours },
            { label: "Min", val: timeLeft.minutes },
            { label: "Sec", val: timeLeft.seconds },
          ].map((unit) => (
            <div key={unit.label} className="bg-zinc-900/40 border border-white/5 rounded-lg py-3 flex flex-col items-center justify-center backdrop-blur-sm">
              <span className="text-xl font-black text-white tabular-nums tracking-tighter">
                {String(unit.val).padStart(2, '0')}
              </span>
              <span className="text-[7px] uppercase font-black tracking-[0.2em] text-[#FF00FF] mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 02. CENTERED HEADER */}
      <header className="mb-24 text-center flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#FF00FF] font-bold tracking-[0.4em] uppercase text-[10px] mb-4"
        >
          The Radar
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-light tracking-tighter uppercase text-white leading-none max-w-2xl"
        >
          Upcoming <br />
          <span className="italic font-black text-[#FF00FF]">Incidents.</span>
        </motion.h1>
      </header>

      {/* 03. EVENTS FEED WITH HIERARCHY */}
      <div className="space-y-40">
        {EVENTS.map((event, index) => {
          const isHero = index === 0;
          return (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: isHero ? 1 : 0.6, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className={`group relative flex flex-col gap-8 ${isHero ? "scale-100" : "scale-95"}`}
            >
              {/* Image Container */}
              <div className={`relative w-full ${isHero ? 'aspect-[16/9]' : 'aspect-[16/7]'} overflow-hidden rounded-sm border border-white/5 bg-zinc-900 shadow-2xl`}>
                <img 
                  src={event.image} 
                  alt={event.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2.5s] ease-out opacity-30 group-hover:opacity-90 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                {isHero && <div className="absolute inset-0 bg-[#FF00FF]/5 mix-blend-overlay animate-pulse" />}
                
                <div className="absolute top-4 right-4">
                   <span className="text-[8px] font-mono bg-black/80 backdrop-blur-md border border-white/10 px-4 py-1.5 text-zinc-400 uppercase tracking-widest rounded-full">
                      {event.type}
                   </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 border-l-2 border-[#FF00FF]/30 pl-8 relative mx-auto md:mx-0 max-w-xl self-center md:self-start">
                <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-[#FF00FF] shadow-[0_0_15px_#FF00FF]" />
                
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs font-mono text-[#FF00FF] font-black">{event.date}</span>
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-800 px-2 py-0.5 rounded">
                      {event.status}
                  </span>
                </div>
                
                <h3 className={`${isHero ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'} font-black uppercase italic tracking-tighter text-white leading-tight mb-3 group-hover:text-[#FF00FF] transition-colors duration-500`}>
                  {event.name}
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">{event.location}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 04. CENTERED CTA SECTION */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-40 p-12 rounded-[2.5rem] bg-zinc-950 border border-white/5 text-center shadow-2xl max-w-2xl mx-auto"
      >
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mb-10 italic">Missing the drop?</p>
        <button 
          onClick={handleJoinClick}
          className={`group relative inline-block px-12 py-5 overflow-hidden rounded-full border transition-all duration-500 ${
            isAlreadyMember 
              ? "text-zinc-600 border-zinc-900 cursor-default" 
              : "text-white border-[#FF00FF] hover:shadow-[0_0_40px_rgba(255,0,255,0.3)]"
          }`}
        >
          <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em]">
            {isAlreadyMember ? "Registry Active" : "Request Access"}
          </span>
          {!isAlreadyMember && (
            <div className="absolute inset-0 bg-[#FF00FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          )}
        </button>
      </motion.div>

      {/* 05. REGISTRY DRAWER */}
      <AnimatePresence>
        {showDrawer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[60]"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 250 }}
              className="fixed inset-x-0 bottom-0 h-[94vh] bg-black border-t border-white/10 rounded-t-[3.5rem] z-[70] overflow-y-auto hide-scrollbar"
            >
               <div className="sticky top-0 w-full flex flex-col items-center py-6 bg-black/90 backdrop-blur-md z-20">
                <button onClick={() => setShowDrawer(false)} className="h-1.5 w-16 bg-zinc-800 rounded-full hover:bg-[#FF00FF] transition-colors" />
                <span className="text-[8px] font-black uppercase tracking-[0.6em] text-zinc-700 mt-5">Registry Identification Required</span>
              </div>
              <div className="pb-32"><JoinPage /></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}