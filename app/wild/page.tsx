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

      {/* SECTION 2.5: THE INSTALLATION (BALL PIT) - RESIZED & CENTERED */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* Resized Image Container: Now using max-w-sm to keep it compact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-[320px] aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden border border-white/5 shadow-2xl mx-auto md:mx-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img 
                src="/assets/ball-pit.jpg" 
                alt="The Installation" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] ease-out"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#FF00FF]">Exhibition 01</span>
              </div>
            </motion.div>

            {/* Text Side: Adjusted to match the smaller image scale */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="space-y-2"
              >
                <p className="text-[#FF00FF] font-mono text-[9px] tracking-[0.4em] uppercase mb-2">
                  London's Only Nightclub Installation
                </p>
                <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.9]">
                  The <br />
                  <span className="text-white">Ball Pit.</span>
                </h2>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-zinc-500 text-[10px] leading-relaxed tracking-[0.1em] uppercase max-w-xs mx-auto md:mx-0"
              >
                A surrealist escape designed for the tactile. 
                Immersive, chaotic, and completely unique to the Natitude experience. 
                Where the night is for play, not just for posing.
              </motion.p>
              
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                <div className="h-[1px] w-8 bg-zinc-800" />
                <span className="text-zinc-700 text-[7px] font-black uppercase tracking-widest italic">Members Only Access</span>
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