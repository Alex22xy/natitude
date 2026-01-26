"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function JoinPage() {
  const [signupCount, setSignupCount] = useState(0); // This will come from your database
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 1. Logic to decide which promotion to show
  const isTier1 = signupCount < 50;
  const isTier2 = signupCount >= 50 && signupCount < 100;
  const promoActive = signupCount < 100;

  return (
    <div className="min-h-screen bg-black pt-20 px-6 pb-20">
      <div className="max-w-md mx-auto">
        
        {/* THE PROMO STATUS BOX */}
        {promoActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 p-6 rounded-2xl border border-[#FF00FF]/30 bg-[#FF00FF]/5 text-center"
          >
            <span className="text-[10px] text-[#FF00FF] font-black tracking-[0.4em] uppercase">
              {isTier1 ? "Tier 1: Founder Status" : "Tier 2: Early Bird"}
            </span>
            <h2 className="text-white text-xl font-light mt-2 italic">
              {isTier1 
                ? "Unlocked: Free Entry + Free Shot" 
                : "Unlocked: Free Shot with first drink"}
            </h2>
            <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
               {/* Visual progress bar */}
              <div 
                className="h-full bg-[#FF00FF] transition-all duration-1000" 
                style={{ width: `${(signupCount / 100) * 100}%` }}
              />
            </div>
            <p className="text-[9px] text-zinc-500 mt-2 uppercase tracking-widest">
              {100 - signupCount} spots remaining before offer expires
            </p>
          </motion.div>
        )}

        {/* THE FORM */}
        <header className="mb-10">
          <h1 className="text-3xl font-light tracking-tighter uppercase text-white">
            Apply for <span className="italic font-black text-[#FF00FF]">Membership</span>
          </h1>
        </header>

        <form className="space-y-6">
          <input name="name" required className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white" placeholder="FULL NAME" />
          <input name="instagram" required className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white" placeholder="INSTAGRAM @" />
          
          <button className="w-full py-6 mt-8 bg-white text-black font-black uppercase tracking-[0.3em] hover:bg-[#FF00FF] hover:text-white transition-all">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}