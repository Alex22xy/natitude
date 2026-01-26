"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function JoinPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Explicitly cast to strings for TypeScript and LocalStorage compatibility
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      telephone: formData.get("telephone") as string,
      instagram: formData.get("instagram") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // PRIVACY: Data stays on the user's device for the Profile/Pass view
        localStorage.setItem("natitude_name", data.name);
        localStorage.setItem("natitude_handle", data.instagram);
        
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center bg-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm"
        >
          <h2 className="text-[#FF00FF] text-5xl font-black italic tracking-tighter mb-6">ACCEPTED.</h2>
          <p className="text-zinc-400 uppercase tracking-[0.3em] text-[10px] leading-loose">
            Your application is encrypted and in queue. <br /> Check your Profile for your digital pass.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-32 bg-black">
      <div className="max-w-md mx-auto">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-light tracking-tighter uppercase mb-2 text-white">
              Apply for <span className="text-[#FF00FF] font-black italic shadow-[#FF00FF]/20">Access</span>
            </h1>
            <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase">
              Natitude is a private community. Membership is selective.
            </p>
          </motion.div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 group-focus-within:text-[#FF00FF] transition-colors">Full Name</label>
            <input 
              name="name" 
              required 
              className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] transition-all px-2 text-white placeholder:text-zinc-800" 
              placeholder="E.G. ALEXANDER WILD"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 group-focus-within:text-[#FF00FF] transition-colors">Instagram @</label>
            <input 
              name="instagram" 
              required 
              className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] transition-all px-2 text-white placeholder:text-zinc-800" 
              placeholder="@USERNAME"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 group-focus-within:text-[#FF00FF] transition-colors">Telephone</label>
            <input 
              name="telephone" 
              required 
              type="tel"
              className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] transition-all px-2 text-white placeholder:text-zinc-800" 
              placeholder="+1 (000) 000-0000"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 group-focus-within:text-[#FF00FF] transition-colors">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] transition-all px-2 text-white placeholder:text-zinc-800" 
              placeholder="VIP@NATITUDE.COM"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 mt-8 bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-[#FF00FF] hover:text-white transition-all duration-500 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Transmitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}