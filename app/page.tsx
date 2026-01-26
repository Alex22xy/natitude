'use client';
import { useState } from 'react';

export default function ComingSoon() {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('JOINING...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          message: "STAY NOTIFIED: This user wants early access to the launch.",
        }),
      });

      if (res.ok) {
        setStatus('YOU ARE ON THE LIST');
        setEmail('');
      } else {
        setStatus('TRY AGAIN');
      }
    } catch (err) {
      setStatus('ERROR');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-[#FF00FF]">
      
      {/* --- BACKGROUND VIDEO LAYER --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-50"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <main className="relative z-10 text-center max-w-lg w-full px-6">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-[0.3em] mb-4 drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">
          Natitude
        </h1>
        
        <div className="h-[2px] w-24 bg-[#FF00FF] mx-auto mb-8 shadow-[0_0_20px_#FF00FF]" />

        <p className="text-xs md:text-sm font-light tracking-[0.4em] uppercase text-white/80 mb-12 leading-relaxed">
          The Tribe is Gathering. <br /> 
          <span className="text-[#FF00FF]">Launching 2026.</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubscribe} className="space-y-4">
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER EMAIL FOR EARLY ACCESS" 
            className="w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-full py-4 px-8 text-[10px] text-center tracking-[0.2em] outline-none focus:border-[#FF00FF]/50 transition-all placeholder:text-white/20"
          />
          
          <button 
            type="submit"
            className="w-full bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] py-4 rounded-full hover:bg-[#FF00FF] hover:text-white transition-all duration-500 shadow-xl"
          >
            {status || 'Get Notified'}
          </button>
        </form>

        <footer className="mt-20">
          <a 
            href="#" 
            className="text-[10px] tracking-[0.5em] text-white/30 hover:text-[#FF00FF] transition-colors"
          >
            INSTAGRAM
          </a>
        </footer>
      </main>
    </div>
  );
}