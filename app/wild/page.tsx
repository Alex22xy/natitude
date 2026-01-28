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

  // Subtle parallax for the background hero
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-[#FF00FF]">
      
      {/* SECTION 1: THE VIDEO HERO */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-10" />
          
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/assets/jungle.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="relative z-20 text-center px-4">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.8em" }}
            transition={{ duration: 1.5 }}
            className="text-[10px] md:text-[12px] uppercase text-[#FF00FF] font-black mb-4"
          >
            Origin Story
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-none"
            style={{
              textShadow: "0 0 50px rgba(255, 0, 255, 0.3)" 
            }}
          >
            The <br className="md:hidden" /> 
            <span className="text-[#FF00FF]">Wild</span>
          </motion.h1>

          {/* Corrected the motion tag below */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-8"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#FF00FF] to-transparent mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE INSTALLATION (BALL PIT) */}
      <section className="py-32 px-6 overflow-hidden bg-zinc-950/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full md:w-[450px] aspect-[16/10] bg-zinc-900 rounded-lg overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] mx-auto md:mx-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <img 
              src="/assets/ball-pit.jpg" 
              alt="The Installation" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.2s] ease-in-out scale-105 hover:scale-100"
            />
            <div className="absolute bottom-5 left-6 z-20 flex items-center gap-3">
              <div className="w-1 h-1 bg-[#FF00FF] rounded-full animate-pulse" />
              <span className="text-[7px] font-black uppercase tracking-[0.6em] text-white/50">Installation Ref: 001</span>
            </div>
          </motion.div>

          <div className="flex-1 space-y-8 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="inline-block px-3 py-1 border border-[#FF00FF]/30 rounded-full mb-4">
                <p className="text-[#FF00FF] font-mono text-[8px] tracking-[0.3em] uppercase">
                  First in Bury St Edmunds
                </p>
              </div>
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-[-0.05em] leading-[0.85]">
                The Only <br />
                <span className="text-white text-stroke-sm">Ball Pit.</span>
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-[11px] leading-relaxed tracking-wider uppercase max-w-sm mx-auto md:mx-0 italic font-medium"
            >
              A surrealist landscape designed for the tactile. 
              Forget the standard dancefloor; reclaim the night in a 
              sea of movement. Immersive, chaotic, and completely 
              exclusive to the Natitude registry.
            </motion.p>
            
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              className="pt-4"
            >
              <div className="h-[1px] w-full bg-gradient-to-r from-[#FF00FF]/50 to-transparent" />
              <p className="text-zinc-700 text-[8px] font-black uppercase tracking-[0.4em] mt-4">
                Access strictly limited to Tier 1 Members
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE MANTRA */}
      <section className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
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

      <div className="h-32 bg-black" />

    </div>
  );
}