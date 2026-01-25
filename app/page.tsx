'use client';
import { useState } from 'react';

export default function ComingSoon() {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('JOINING...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        message: "STAY NOTIFIED: This user wants to be notified of the launch.",
      }),
    });

    if (res.ok) {
      setStatus('YOU ARE ON THE LIST');
      setEmail('');
    } else {
      setStatus('TRY AGAIN');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-white font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF00FF]/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 text-center max-w-lg w-full">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-[0.3em] mb-4 animate-pulse">
          Natitude
        </h1>
        <div className="h-[2px] w-24 bg-[#FF00FF] mx-auto mb-8 shadow-[0_0_20px_#FF00FF]" />
        <p className="text-sm font-light tracking-[0.4em] uppercase text-white/60 mb-12">
          The Tribe is Gathering. <br /> Launching 2026.
        </p>

        <form onSubmit={handleSubscribe} className="space-y-4">
          <input 
            type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER EMAIL FOR EARLY ACCESS" 
            className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-4 px-8 text-xs text-center tracking-widest outline-none focus:border-[#FF00FF]/50 transition-all placeholder:text-white/20"
          />
          <button type="submit" className="w-full bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] py-4 rounded-full hover:bg-[#FF00FF] hover:text-white transition-all duration-500">
            {status || 'Get Notified'}
          </button>
        </form>

        <footer className="mt-20">
          <a href="#" className="text-[10px] tracking-[0.5em] text-white/30 hover:text-[#FF00FF]">INSTAGRAM</a>
        </footer>
      </main>
    </div>
  );
}