"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function WildPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Subtle parallax for the background
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="bg-black text-white">
      
      {/* SECTION 1: THE HOOK */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-10" />
          {/* Use a high-quality dark nature/industrial image */}
          <img 
            src="/wild-hero.jpg" 
            alt="The Wild" 
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>

        <div className="relative z-20 text-center">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.8em" }}
            transition={{ duration: 1.5 }}
            className="text-[10px] uppercase text-[#FF00FF] font-black mb-6"
          >
            Origin Story
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter"
          >
            The <span className="text-[#FF00FF]">Wild</span>
          </motion.h1>
        </div>
      </section>

      {/* SECTION 2: THE MANIFESTO */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-4xl mx-auto space-y-24 py-32">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="text-[#FF00FF] font-mono text-xs">01 / THE INSTINCT</span>
          <h2 className="text-4xl md:text-6xl font-light italic leading-tight">
            We stopped looking up <br />
            <span className="text-zinc-600">and started looking at screens.</span>
          </h2>
          <p className="text-zinc-400 max-w-md text-sm leading-relaxed tracking-wide">
            Natitude was born in the shadows of the concrete jungle. A response to the hyper-connected, yet deeply isolated world we inhabit. We are the digital detox. The midnight pulse.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="ml-auto text-right space-y-4"
        >
          <span className="text-[#FF00FF] font-mono text-xs">02 / THE MISSION</span>
          <h2 className="text-4xl md:text-6xl font-light italic leading-tight">
            Curated Anonymity. <br />
            <span className="text-zinc-600">Analog Connection.</span>
          </h2>
          <p className="text-zinc-400 max-w-md ml-auto text-sm leading-relaxed tracking-wide">
            No tags. No livestreams. No noise. Just a private registry of individuals who value the presence of the moment over the vanity of the post.
          </p>
        </motion.div>
      </section>

      {/* SECTION 3: THE VIBE (PHOTO MANTRA) */}
      <section className="h-[70vh] bg-zinc-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 grayscale contrast-125">
             <img src="/wild-texture.jpg" className="w-full h-full object-cover" />
        </div>
        <h2 className="relative z-10 text-[12vw] font-black italic uppercase opacity-10 tracking-tighter select-none">
            RECLAIM THE NIGHT
        </h2>
      </section>

      {/* SECTION 4: THE CALL BACK */}
      <section className="py-40 flex flex-col items-center justify-center text-center px-6">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           className="space-y-8"
        >
            <h3 className="text-3xl font-light tracking-tighter uppercase">Are you ready to join the <span className="italic font-black text-[#FF00FF]">Registry?</span></h3>
            <Link href="/join" className="group relative inline-block px-12 py-6 overflow-hidden rounded-full border border-white/20 transition-all hover:border-[#FF00FF]">
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em]">Apply for Access</span>
              <div className="absolute inset-0 bg-[#FF00FF] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
        </motion.div>
      </section>

    </div>
  );
}