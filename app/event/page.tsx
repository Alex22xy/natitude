"use client";
import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    title: "The Midnight Ball",
    date: "FEB 14",
    location: "Main Installation",
    status: "Priority Access",
    time: "22:00 - LATE",
  },
  {
    id: 2,
    title: "Neon Jungle",
    date: "FEB 28",
    location: "The Wild",
    status: "Sold Out",
    time: "21:00 - 04:00",
  },
  {
    id: 3,
    title: "Analog Night",
    date: "MAR 12",
    location: "Secret Location",
    status: "Registration Open",
    time: "23:00 - LATE",
  }
];

export default function EventPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 pt-12">
      {/* Header Section */}
      <header className="mb-12">
        <motion.p 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#FF00FF] font-mono text-[10px] tracking-[0.4em] uppercase mb-2"
        >
          Upcoming Drops
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black italic uppercase tracking-tighter"
        >
          The <span className="text-[#FF00FF]">Schedule</span>
        </motion.h1>
      </header>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden bg-zinc-900/40 border border-white/5 rounded-2xl p-6 transition-all hover:border-[#FF00FF]/50"
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{event.date}</span>
                <h3 className="text-2xl font-black italic uppercase tracking-tight group-hover:text-[#FF00FF] transition-colors">
                  {event.title}
                </h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{event.location} // {event.time}</p>
              </div>
              
              <div className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${
                event.status === "Sold Out" 
                ? "border-red-500/50 text-red-500" 
                : "border-[#FF00FF]/50 text-[#FF00FF]"
              }`}>
                {event.status}
              </div>
            </div>

            {/* Hover Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.8 }}
        className="mt-20 text-center"
      >
        <p className="text-[9px] uppercase tracking-[0.5em] font-medium leading-loose">
          Location details for "Secret" events <br /> 
          are pushed to your Registry ID <br />
          2 hours before doors.
        </p>
      </motion.div>
      
      {/* Navigation Spacer */}
      <div className="h-32" />
    </div>
  );
}