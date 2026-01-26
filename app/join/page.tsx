"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function JoinPage() {
  const [signupCount, setSignupCount] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hpValue, setHpValue] = useState(""); 

  // 2. Fetch the live count from Supabase on page load
  useEffect(() => {
    async function fetchCount() {
      const { count, error } = await supabase
        .from('signups')
        .select('*', { count: 'exact', head: true });
      
      if (!error && count !== null) {
        setSignupCount(count);
      }
    }
    fetchCount();
  }, []);

  // Tier Logic
  const isTier1 = signupCount < 50;
  const isTier2 = signupCount >= 50 && signupCount < 100;
  const promoActive = signupCount < 100;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // Bot Check
    if (hpValue !== "") return; 

    const formData = new FormData(e.currentTarget);
    const tel = formData.get("telephone") as string;

    // UK Mobile Validation
    const phoneRegex = /^(?:0|\+44)\d{10,12}$/;
    if (!phoneRegex.test(tel.replace(/\s/g, ""))) {
      alert("Please enter a valid UK mobile number (at least 11 digits).");
      return;
    }

    setLoading(true);

    const data = {
      name: formData.get("name"),
      telephone: tel,
      instagram: formData.get("instagram"),
      email: formData.get("email"),
      tier: isTier1 ? "Tier 1: Free Entry + Shot" : isTier2 ? "Tier 2: Free Shot" : "Standard"
    };

    try {
      // 3. AUTOMATIC STEP: Insert into Supabase Table
      const { error: dbError } = await supabase
        .from('signups')
        .insert([{ 
          name: data.name, 
          email: data.email, 
          instagram: data.instagram, 
          telephone: data.telephone 
        }]);

      if (dbError) throw dbError;

      // 4. Send Email via API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        localStorage.setItem("natitude_name", data.name as string);
        localStorage.setItem("natitude_handle", data.instagram as string);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("System error. Your application was not transmitted.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-[#FF00FF] text-3xl font-black italic uppercase mb-2 leading-none">Access Requested.</h2>
          <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase">Check your email for confirmation.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-6 pb-32">
      <div className="max-w-md mx-auto">
        
        {/* PROMO STATUS */}
        {promoActive && (
          <div className="mb-10 p-6 rounded-2xl border border-[#FF00FF]/20 bg-[#FF00FF]/5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] text-[#FF00FF] font-black tracking-widest uppercase">
                {isTier1 ? "Tier 1 Promo" : "Tier 2 Promo"}
              </span>
              <span className="text-zinc-600 text-[9px] font-mono uppercase">{100 - signupCount} Spots Left</span>
            </div>
            <h2 className="text-white text-lg font-light italic leading-tight">
              {isTier1 ? "Free Entry + Free Shot Unlocked" : "Free Shot Unlocked"}
            </h2>
            {/* Visual Progress Bar */}
            <div className="mt-4 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(signupCount / 100) * 100}%` }}
                className="h-full bg-[#FF00FF]"
              />
            </div>
          </div>
        )}

        <header className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-tighter text-white uppercase leading-none">
            Member <br />
            <span className="italic font-black text-[#FF00FF]">Application</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" style={{ display: 'none' }} value={hpValue} onChange={(e) => setHpValue(e.target.value)} />

          <div className="space-y-1">
            <label className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase ml-1">Full Identity</label>
            <input name="name" required type="text" placeholder="Name" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest transition-colors" />
          </div>

          <div className="space-y-1">
            <label className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase ml-1">Secure Contact (UK Mobile)</label>
            <input name="telephone" required type="tel" placeholder="07XXXXXXXXX" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest transition-colors" />
          </div>
          
          <div className="space-y-1">
            <label className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase ml-1">Social Handle</label>
            <input name="instagram" required type="text" placeholder="@NATITUDE" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest transition-colors" />
          </div>
          
          <div className="space-y-1">
            <label className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase ml-1">Direct Email</label>
            <input name="email" required type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest transition-colors" />
          </div>

          <button 
            disabled={loading}
            className="w-full py-6 mt-6 bg-white text-black font-black uppercase tracking-[0.3em] hover:bg-[#FF00FF] hover:text-white transition-all active:scale-95 disabled:opacity-20"
          >
            {loading ? "Authenticating..." : "Apply for Access"}
          </button>
        </form>
      </div>
    </div>
  );
}