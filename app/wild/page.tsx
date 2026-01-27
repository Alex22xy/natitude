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
    <div ref={containerRef} className="bg-black text-white selection:bg-[#FF00FF]">
      
      {/* SECTION 1: THE HOOK */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          {/* Darker gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black z-10" />
          <img 
            src="/assets/wild-hero.jpg" 
            alt="The Wild" 
            className="w-full h-full object-cover opacity-50"
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
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-4xl mx-auto space-y-32 py-32">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="text-[#FF00FF] font-mono text-xs">01 / THE INSTINCT</span>
          <h2 className="text-4xl md:text-6xl font-light italic leading-tight uppercase tracking-tighter">
            We stopped looking up <br />
            <span className="text-zinc-600 font-black">and started looking at screens.</span>
          </h2>
          <p className="text-zinc-400 max-w-md text-sm leading-relaxed tracking-wide uppercase text-[10px]">
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
          <h2 className="text-4xl md:text-6xl font-light italic leading-tight uppercase tracking-tighter">
            Curated Anonymity. <br />
            <span className="text-zinc-600 font-black">Analog Connection.</span>
          </h2>
          <p className="text-zinc-400 max-w-md ml-auto text-sm leading-relaxed tracking-wide uppercase text-[10px]">
            No tags. No livestreams. No noise. Just a private registry of individuals who value the presence of the moment over the vanity of the post.
          </p>
        </motion.div>
      </section>

      {/* SECTION 3: THE VIBE (PHOTO MANTRA - UPDATED FOR READABILITY) */}
      <section className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background texture with a darker overlay to make white text pop */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" /> 
          <img 
            src="/assets/wild-texture.jpg" 
            className="w-full h-full object-cover grayscale contrast-125 opacity-40" 
          />
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 text-[12vw] font-black italic uppercase tracking-tighter leading-[0.85] text-center"
          style={{
            color: "white",
            WebkitTextStroke: "1px rgba(255,255,255,0.2)",
            textShadow: "0 20px 80px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.5)"
          }}
        >
          Reclaim <br />
          <span className="text-[#FF00FF]">The Night</span>
        </motion.h2>
      </section>

      {/* SECTION 4: THE CALL BACK */}
      <section className="py-60 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-t from-[#FF00FF]/10 to-black">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           className="space-y-12"
        >
            <h3 className="text-4xl md:text-5xl font-light tracking-tighter uppercase leading-none">
                Are you ready to join <br /> 
                the <span className="italic font-black text-[#FF00FF]">Registry?</span>
            </h3>
            <Link href="/join" className="group relative inline-block px-16 py-8 overflow-hidden rounded-full border border-white/20 transition-all hover:border-[#FF00FF]">
              <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em]">Apply for Access</span>
              <div className="absolute inset-0 bg-[#FF00FF] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-tight" />
            </Link>
        </motion.div>
      </section>

    </div>
  );
}