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

      {/* SECTION 2.5: THE INSTALLATION (BALL PIT) */}
<section className="py-32 px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Visual Side */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="relative aspect-[4/5] bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      {/* REPLACE WITH YOUR BALL PIT IMAGE */}
      <img 
        src="/assets/ball-pit.jpg" 
        alt="The Installation" 
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]"
      />
      <div className="absolute bottom-8 left-8 z-20">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF00FF]">Installation 01</span>
      </div>
    </motion.div>

    {/* Text Side */}
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
          The Only <br />
          <span className="text-white">Ball Pit.</span>
        </h2>
        <p className="text-[#FF00FF] font-mono text-[10px] tracking-[0.3em] uppercase">
          A London Club First.
        </p>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-zinc-400 text-sm leading-relaxed tracking-wide uppercase text-[10px] max-w-sm"
      >
        Forget the standard dancefloor. We’ve built a surrealist escape. 
        Immersive, chaotic, and completely unique to the Natitude experience. 
        The night is for play, not just for posing.
      </motion.p>
      
      <div className="flex items-center gap-4 pt-4">
        <div className="h-[1px] w-12 bg-[#FF00FF]" />
        <span className="text-zinc-600 text-[8px] font-black uppercase tracking-widest">Reserved for Registry Members only</span>
      </div>
    </div>
  </div>
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