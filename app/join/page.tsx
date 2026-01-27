"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export default function JoinPage() {
  const [signupCount, setSignupCount] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hpValue, setHpValue] = useState(""); 

  // Function to fetch the count
  async function fetchCount() {
    if (!supabase) return;
    const { count, error } = await supabase
      .from('signups')
      .select('*', { count: 'exact', head: true });
    if (!error && count !== null) setSignupCount(count);
  }

  useEffect(() => {
      fetchCount();

      const channel = supabase
        ?.channel('realtime-signups')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'signups' }, 
          () => fetchCount()
        )
        .subscribe();

      return () => {
        // Check if BOTH supabase and channel exist before removing
        if (supabase && channel) {
          supabase.removeChannel(channel);
        }
      };
    }, []);

  const isTier1 = signupCount < 50;
  const isTier2 = signupCount >= 50 && signupCount < 100;
  const promoActive = signupCount < 100;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (hpValue !== "" || !supabase) return; 

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const instagram = formData.get("instagram") as string;
    const tel = formData.get("telephone") as string;
    
    const phoneRegex = /^(?:0|\+44)\d{10,12}$/;
    if (!phoneRegex.test(tel.replace(/\s/g, ""))) {
      alert("Please enter a valid UK mobile number.");
      return;
    }

    setLoading(true);

    const data = {
      name: name,
      telephone: tel,
      instagram: instagram,
      email: formData.get("email"),
      tier: isTier1 ? "Tier 1: Free Entry + Shot" : isTier2 ? "Tier 2: Free Shot" : "Standard"
    };

    try {
      // 1. Insert into Supabase
      const { error: dbError } = await supabase
        .from('signups')
        .insert([{ 
          name: data.name, 
          email: data.email, 
          instagram: data.instagram, 
          telephone: data.telephone 
        }]);

      if (dbError) throw dbError;

      // 2. Save to LocalStorage for the Profile Page
      localStorage.setItem("natitude_name", name);
      localStorage.setItem("natitude_handle", instagram);

      // 3. Send Email Notification
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Transmission failed. Secure link unavailable.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-[#FF00FF] text-3xl font-black italic uppercase mb-2">Access Requested.</h2>
          <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-8 text-balance">
            Private confirmation sent to your email.
          </p>
          <a 
            href="/profile" 
            className="px-8 py-4 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            View Membership Card
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-6 pb-32">
      <div className="max-w-md mx-auto">
        
        {promoActive && (
          <div className="mb-10 p-6 rounded-2xl border border-[#FF00FF]/20 bg-[#FF00FF]/5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] text-[#FF00FF] font-black tracking-widest uppercase">
                {isTier1 ? "Tier 1 Status" : "Tier 2 Status"}
              </span>
              <span className="text-zinc-600 text-[9px] font-mono uppercase">{100 - signupCount} Spots Left</span>
            </div>
            <h2 className="text-white text-lg font-light italic">{isTier1 ? "Free Entry + Shot Unlocked" : "Free Shot Unlocked"}</h2>
            <div className="mt-4 h-[1px] w-full bg-white/10">
                <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${(signupCount / 100) * 100}%` }} 
                    className="h-full bg-[#FF00FF]" 
                />
            </div>
          </div>
        )}

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-light tracking-tighter text-white uppercase leading-none">
            Member <br /> <span className="italic font-black text-[#FF00FF]">Application</span>
          </h1>
          
          <div className="mt-6 flex items-center justify-center gap-2 py-2 px-4 border border-zinc-800 rounded-full w-fit mx-auto">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[8px] text-zinc-500 font-black tracking-[0.2em] uppercase">
              Encrypted Private Registry
            </span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" style={{ display: 'none' }} value={hpValue} onChange={(e) => setHpValue(e.target.value)} />

          <div className="space-y-1">
            <label className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase ml-1 font-bold">Identity</label>
            <input name="name" required type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest" />
          </div>

          <div className="space-y-1">
            <label className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase ml-1 font-bold">Secure Contact</label>
            <input name="telephone" required type="tel" placeholder="UK Mobile" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest" />
          </div>
          
          <div className="space-y-1">
            <label className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase ml-1 font-bold">Social</label>
            <input name="instagram" required type="text" placeholder="@Instagram" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest" />
          </div>
          
          <div className="space-y-1">
            <label className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase ml-1 font-bold">Direct Email</label>
            <input name="email" required type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] text-white uppercase text-xs tracking-widest" />
          </div>

          <button disabled={loading} className="w-full py-6 mt-6 bg-white text-black font-black uppercase tracking-[0.3em] hover:bg-[#FF00FF] hover:text-white transition-all disabled:opacity-20">
            {loading ? "Verifying..." : "Apply for Access"}
          </button>
          
          <p className="text-[7px] text-center text-zinc-700 uppercase tracking-widest leading-relaxed">
            By applying, you agree to our private membership terms.<br/>Your data is 256-bit encrypted and never shared.
          </p>
        </form>
      </div>
    </div>
  );
}