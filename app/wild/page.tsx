'use client';
import { useState, useEffect } from 'react';

export default function TheWildPage() {
  const [status, setStatus] = useState('');
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, result: 0 });
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => { generateCaptcha(); }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setCaptcha({ a, b, result: a + b });
  };

  const sections = [
    { title: "Opening Hours", content: "WED - SAT: 10PM - 4AM\nSUN: 8PM - 2AM", highlight: "LIVE NOW" },
    { title: "The Sanctuary", content: "Zero-tolerance policy. Trained wellbeing staff on-site.", highlight: "SAFETY FIRST" },
    { title: "Promotions", content: "Complimentary jungle cocktail for members before 11 PM.", highlight: "MEMBER PERK" },
    { title: "Private Hire", content: "Full venue and VIP booth packages available.", highlight: "ENQUIRE" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseInt(userAnswer) !== captcha.result) {
      setStatus('WRONG ANSWER');
      return;
    }
    setStatus('SENDING...');
    
    const formData = new FormData(e.currentTarget);
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    });

    if (res.ok) {
      setStatus('MESSAGE SENT');
      (e.target as HTMLFormElement).reset();
      setUserAnswer('');
      generateCaptcha();
    } else {
      setStatus('ERROR - TRY AGAIN');
    }
  };

  return (
    <div className="min-h-screen bg-black px-6 pt-20 pb-32 overflow-y-auto font-sans">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black uppercase tracking-[0.4em] text-white">The Wild</h1>
        <div className="mt-2 h-1 w-12 bg-[#FF00FF] mx-auto rounded-full shadow-[0_0_15px_#FF00FF]" />
      </div>

      <div className="grid gap-6 w-full max-w-md mx-auto">
        {sections.map((item, i) => (
          <div key={i} className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900/40 p-1 backdrop-blur-xl">
            <div className="absolute inset-0 z-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF00FF]/40 to-transparent opacity-0 group-hover:animate-scan group-hover:opacity-100" />
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#FF00FF] text-[10px] font-black uppercase tracking-[0.3em]">{item.title}</h2>
                <div className="flex gap-1">
                  <span className="h-1 w-4 bg-white/10 rounded-full" />
                  <span className="h-1 w-1 bg-[#FF00FF] rounded-full animate-pulse" />
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line font-medium mb-6">{item.content}</p>
              <div className="flex items-center gap-2 border-t border-white/5 pt-4">
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Status</span>
                <span className="text-[9px] text-[#FF00FF] uppercase tracking-widest font-black">{item.highlight}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Contact Form Card */}
        <div className="relative overflow-hidden rounded-[24px] border border-[#FF00FF]/30 bg-zinc-900/60 p-8 backdrop-blur-2xl">
          <h2 className="text-[#FF00FF] text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-center underline decoration-[#FF00FF]/20 underline-offset-8">Direct Inquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="email" type="email" required placeholder="YOUR EMAIL" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white placeholder:text-white/20 outline-none focus:border-[#FF00FF]/50" />
            <textarea name="message" required placeholder="HOW CAN WE HELP?" rows={3} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white placeholder:text-white/20 outline-none focus:border-[#FF00FF]/50" />
            
            <div className="flex items-center justify-between bg-black/40 border border-white/5 p-4 rounded-xl">
              <span className="text-[9px] text-white/40 uppercase font-black">Bot Check: {captcha.a} + {captcha.b} =</span>
              <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} required className="w-14 bg-[#FF00FF]/10 border border-[#FF00FF]/30 rounded-lg p-2 text-center text-xs text-[#FF00FF]" />
            </div>

            <button type="submit" className="w-full bg-[#FF00FF] text-black text-[10px] font-black uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(255,0,255,0.3)] active:scale-95 transition-all">
              {status || 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}