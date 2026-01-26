"use client";
import { motion } from "framer-motion";

const sections = [
  {
    id: "01",
    tag: "Acoustics",
    title: "The Soundscape",
    description: "Immersive frequency control designed for the elite hunter.",
  },
  {
    id: "02",
    tag: "Exclusivity",
    title: "The Altar",
    description: "Private sanctuary tables with dedicated concierge and 360 views.",
  },
  {
    id: "03",
    tag: "Culture",
    title: "The Tribe",
    description: "A collective of the bold, the wild, and the restless.",
  },
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-black pt-32 px-6">
      {/* Manifesto Intro */}
      <section className="mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#FF00FF] font-bold tracking-[0.3em] uppercase text-xs mb-6">
            The Manifesto
          </h2>
          <h1 className="text-5xl font-light tracking-tighter leading-[1.1] mb-8">
            Lose your <br />
            <span className="italic font-serif">inhibitions.</span> <br />
            Find your <span className="text-[#FF00FF] font-black">tribe.</span>
          </h1>
          <p className="text-zinc-500 max-w-xs leading-relaxed font-light">
            Natitude is not a destination. It is a state of biological evolution 
            fueled by sound and neon.
          </p>
        </motion.div>
      </section>

      {/* Experience Vertical List */}
      <div className="space-y-4">
        {sections.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="group relative h-[60vh] w-full rounded-[2.5rem] bg-zinc-900 overflow-hidden flex flex-col justify-end p-8 border border-white/5"
          >
            {/* Visual Placeholder for Video/Image Assets */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            
            <div className="relative z-20">
              <span className="text-[10px] tracking-widest uppercase text-[#FF00FF] font-bold">
                {item.id} // {item.tag}
              </span>
              <h3 className="text-3xl font-bold tracking-tighter uppercase mt-2 italic">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-sm mt-2 max-w-[240px] font-light">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="py-20 text-center">
        <p className="text-[10px] tracking-[0.5em] text-zinc-600 uppercase">
          Natitude Worldwide
        </p>
      </div>
    </div>
  );
}