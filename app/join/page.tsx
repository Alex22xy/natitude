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
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      instagram: formData.get("instagram"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-[#FF00FF] text-4xl font-black italic tracking-tighter mb-4">ACCEPTED.</h2>
          <p className="text-zinc-400 uppercase tracking-widest text-xs">The tribe will reach out shortly.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-md mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-light tracking-tighter uppercase mb-2">
            Apply for <span className="text-[#FF00FF] font-black italic">Access</span>
          </h1>
          <p className="text-zinc-500 text-sm tracking-wide uppercase">
            Natitude is a private community. Membership is selective.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 group-focus-within:text-[#FF00FF] transition-colors">Full Name</label>
            <input 
              name="name" 
              required 
              className="w-full bg-zinc-900/50 border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] transition-all px-2 text-white" 
              placeholder="E.G. ALEXANDER WILD"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 group-focus-within:text-[#FF00FF] transition-colors">Instagram @</label>
            <input 
              name="instagram" 
              required 
              className="w-full bg-zinc-900/50 border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] transition-all px-2 text-white" 
              placeholder="@USERNAME"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 group-focus-within:text-[#FF00FF] transition-colors">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full bg-zinc-900/50 border-b border-white/10 py-4 outline-none focus:border-[#FF00FF] transition-all px-2 text-white" 
              placeholder="VIP@NATITUDE.COM"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 mt-8 bg-white text-black font-black uppercase tracking-[0.3em] hover:bg-[#FF00FF] hover:text-white transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Transmitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}