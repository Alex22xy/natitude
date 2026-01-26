"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const ZONES = [
  {
    id: "altar",
    name: "The Altar",
    tier: "Tier 1 — Ultimate Exclusivity",
    minSpend: "$5,000+",
    description: "Located behind the DJ booth. 360-degree views of the tribe. Private security.",
  },
  {
    id: "pit",
    name: "The Pit",
    tier: "Tier 2 — High Energy",
    minSpend: "$3,000+",
    description: "Heart of the dance floor. Immersive sound and sub-bass intensity.",
  },
  {
    id: "shadows",
    name: "The Shadows",
    tier: "Tier 3 — Discreet",
    minSpend: "$1,500+",
    description: "Perimeter booths. Perfect for those who want to watch without being seen.",
  }
];

export default function VIPPage() {
  const [selectedZone, setSelectedZone] = useState("");

  return (
    <div className="min-h-screen pt-32 px-6 pb-32">
      <header className="max-w-md mx-auto mb-12 text-center">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-4">
          Reserve <span className="text-[#FF00FF]">The Night.</span>
        </h1>
        <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase leading-relaxed">
          Select your territory. Our concierge will contact you within 60 minutes.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
        {ZONES.map((zone) => (
          <motion.div
            key={zone.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedZone(zone.id)}
            className={`cursor-pointer p-8 rounded-[2rem] border transition-all duration-500 flex flex-col justify-between h-[400px] ${
              selectedZone === zone.id 
              ? "border-[#FF00FF] bg-zinc-900 shadow-[0_0_30px_rgba(255,0,255,0.2)]" 
              : "border-white/5 bg-zinc-900/30 hover:border-white/20"
            }`}
          >
            <div>
              <span className="text-[10px] tracking-widest text-[#FF00FF] font-bold uppercase">
                {zone.tier}
              </span>
              <h3 className="text-3xl font-bold italic uppercase mt-2 tracking-tighter">
                {zone.name}
              </h3>
              <p className="text-zinc-500 text-sm mt-4 font-light leading-relaxed">
                {zone.description}
              </p>
            </div>

            <div>
              <p className="text-white font-bold text-xl tracking-tighter">{zone.minSpend}</p>
              <p className="text-zinc-600 text-[10px] uppercase tracking-widest">Min. Spend</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedZone && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-0 right-0 px-6 z-40"
        >
          <div className="max-w-md mx-auto">
             <button className="w-full py-6 bg-[#FF00FF] text-white font-black uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(255,0,255,0.4)] transition-transform active:scale-95">
                Confirm {selectedZone}
             </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}