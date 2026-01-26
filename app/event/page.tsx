"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JoinPage from "../join/page"; // Reusing your high-end form logic

const EVENTS = [
  {
    id: 1,
    date: "FEB 14",
    name: "Neon Velour",
    location: "London — Secret",
    status: "Invites Only",
    type: "Warehouse"
  },
  {
    id: 2,
    date: "MAR 02",
    name: "The Altar: Session I",
    location: "Dubai — DIFC",
    status: "Table Access Only",
    type: "Club"
  },
  {
    id: 3,
    date: "MAR 21",
    name: "Biological Evolution",
    location: "Miami — Wynwood",
    status: "Application Open",
    type: "Underground"
  }
];

export default function EventsPage() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="min-h-screen bg-black pt-32 px-6 pb-32">
      <header className="mb-16">
        <h2 className="text-[#FF00FF] font-bold tracking-[0.3em] uppercase text-[10px] mb-4">
          The Radar
        </h2>
        <h1 className="text-4xl font-light tracking-tighter uppercase text-white">
          Upcoming <br />
          <span className="italic font-black text-[#FF00FF]">Incidents.</span>
        </h1>
      </header>

      <div className="space-y-12">
        {EVENTS.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex items-start gap-6 border-l border-white/10 pl-6 pb-4"
          >
            <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-white group-hover:bg-[#FF00FF] transition-colors shadow-[0_0_10px_rgba(255,0,255,0.5)]" />
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-zinc-500 tracking-tighter">
                  {event.date} // {event.type}
                </span>
                <span className="text-[8px] border border-white/20 px-2 py-1 rounded text-zinc-400 uppercase tracking-widest">
                  {event.status}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold uppercase italic tracking-tighter text-white group-hover:text-[#FF00FF] transition-colors">
                {event.name}
              </h3>
              <p className="text-sm text-zinc-500 font-light mt-1">
                {event.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 text-center"
      >
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-4">
          Want priority for the next incident?
        </p>
        <button 
          onClick={() => setShowDrawer(true)}
          className="text-white border-b border-[#FF00FF] pb-1 text-xs uppercase tracking-widest font-black italic hover:text-[#FF00FF] transition-all active:scale-95"
        >
          Join the waitlist
        </button>
      </motion.div>

      {/* Stealth Application Drawer */}
      <AnimatePresence>
        {showDrawer && (
          <>
            {/* Backdrop blur to dim the Radar behind the drawer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 h-[90vh] bg-black border-t border-white/10 rounded-t-[3rem] z-[70] overflow-y-auto"
            >
              {/* Close Bar */}
              <div className="sticky top-0 w-full flex justify-center py-4 bg-black/50 backdrop-blur-sm z-20">
                <button 
                  onClick={() => setShowDrawer(false)}
                  className="h-1 w-12 bg-zinc-800 rounded-full hover:bg-[#FF00FF] transition-colors"
                />
              </div>

              {/* Injected Join Logic */}
              <div className="pb-20">
                <JoinPage />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}