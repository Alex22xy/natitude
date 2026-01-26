"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VIPPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      telephone: formData.get("phone"),
      instagram: formData.get("instagram"),
      zone: selectedZone, // Passing the selected VIP tier
      type: "VIP_TABLE_REQUEST"
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.ok) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-40 px-6">
      {/* Zone Grid (Existing logic from previous step) */}
      <div className="max-w-6xl mx-auto">
         {/* ... (Zone cards here) ... */}
      </div>

      <AnimatePresence>
        {selectedZone && !submitted && (
          <motion.div 
            initial={{ y: 100 }} 
            animate={{ y: 0 }} 
            exit={{ y: 100 }}
            className="fixed bottom-24 left-0 right-0 px-4 z-50"
          >
            <div className="max-w-lg mx-auto bg-zinc-900 border border-[#FF00FF]/30 p-8 rounded-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <h3 className="text-xl font-bold italic uppercase mb-6">Inquire for {selectedZone}</h3>
              <form onSubmit={handleBooking} className="space-y-4">
                <input name="name" placeholder="FULL NAME" required className="w-full bg-black/50 border-b border-white/10 py-3 outline-none focus:border-[#FF00FF] transition-all px-2 text-sm" />
                <input name="phone" placeholder="WHATSAPP / TELEPHONE" required className="w-full bg-black/50 border-b border-white/10 py-3 outline-none focus:border-[#FF00FF] transition-all px-2 text-sm" />
                <button type="submit" className="w-full py-5 bg-[#FF00FF] text-white font-black uppercase tracking-widest text-xs mt-4">
                  Request Table Access
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success State Overlay */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black z-[60] flex items-center justify-center text-center p-6">
            <div>
              <h2 className="text-[#FF00FF] text-6xl font-black italic mb-4">CONFIRMED.</h2>
              <p className="text-zinc-400 uppercase tracking-[0.3em] text-xs">Our concierge will contact you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="mt-12 text-white/40 uppercase text-[10px] tracking-widest border-b border-white/10 pb-1">Return to The Wild</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}