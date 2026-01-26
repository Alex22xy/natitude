"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function JoinPage() {
  const [signupCount, setSignupCount] = useState(0); // Set this manually or connect to DB
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Security Layer 1: Honeypot state
  const [hpValue, setHpValue] = useState("");

  // Logic for Tiers
  const isTier1 = signupCount < 50;
  const isTier2 = signupCount >= 50 && signupCount < 100;
  const promoActive = signupCount < 100;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // Security Layer 2: Bot check
    if (hpValue !== "") {
      console.log("Bot detected.");
      return; 
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      instagram: formData.get("instagram"),
      email: formData.get("email"),
      tier: isTier1 ? "Tier 1: Free Entry + Shot" : isTier2 ? "Tier 2: Free Shot" : "Standard"
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        localStorage.setItem("natitude_name", data.name as string);
        localStorage.setItem("natitude_handle", data.instagram as string);
        setSubmitted(true);
      }
    } catch (error) {
      alert("System error. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-[#FF00FF] text-3xl font-black italic uppercase mb-2">Access Requested.</h2>
          <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase">Check your email for confirmation.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-6 pb-32">
      <div className="max-w-md mx-auto">
        
        {/* PROMO DISPLAY */}
        {promoActive && (
          <div className="mb-10 p-6 rounded-2xl border border-[#FF00FF]/20 bg-[#FF00FF]/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] text-[#FF00FF] font-black tracking-widest uppercase">
                {isTier1 ? "Tier 1 Promo Active" : "Tier 2 Promo Active"}
              </span>
              <span className="text-zinc-600 text-[9px] font-mono">{100 - signupCount} Spots Left</span>
            </div>
            <h2 className="text-white text-lg font-light italic">
              {isTier1 ? "Free Entry + Free Shot Unlocked" : "Free Shot Unlocked"}
            </h2>
          </div>
        )}

        <header className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-tighter text-white uppercase leading-none">
            Member <span className="italic font-black text-[#FF00FF]">Application</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BOT TRAP: Hidden from humans */}
          <input 
            type="text" 
            style={{ display: 'none' }} 
            value={hpValue} 
            onChange={(e) => setHpValue(e.target.value)} 
            autoComplete="off" 
          />

          <input name="name" required type="text" placeholder="FULL NAME" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest" />
          
          <input name="phone" required type="tel" placeholder="TELEPHONE" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest" />
          
          <input name="instagram" required type="text" placeholder="INSTAGRAM @" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest" />
          
          <input name="email" required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest" />

          <button 
            disabled={loading}
            className="w-full py-6 mt-6 bg-white text-black font-black uppercase tracking-[0.3em] hover:bg-[#FF00FF] hover:text-white transition-all active:scale-95 disabled:opacity-20"
          >
            {loading ? "Verifying..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
}