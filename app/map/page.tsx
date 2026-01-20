export default function TheWildPage() {
  const sections = [
    { title: "Opening Hours", content: "WED - SAT: 10PM - 4AM\nSUN: 8PM - 2AM", highlight: "LIVE NOW" },
    { title: "The Sanctuary", content: "Zero-tolerance policy. Trained wellbeing staff on-site.", highlight: "SAFETY FIRST" },
    { title: "Promotions", content: "Complimentary jungle cocktail for members before 11 PM.", highlight: "MEMBER PERK" },
    { title: "Private Hire", content: "Full venue and VIP booth packages available.", highlight: "ENQUIRE" },
  ];

  return (
    <div className="min-h-screen bg-black px-6 pt-20 pb-32 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black uppercase tracking-[0.4em] text-white">The Wild</h1>
        <div className="mt-2 h-1 w-12 bg-[#FF00FF] mx-auto rounded-full shadow-[0_0_15px_#FF00FF]" />
      </div>

      <div className="grid gap-6 w-full max-w-md mx-auto">
        {sections.map((item, i) => (
          <div key={i} className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900/40 p-1 backdrop-blur-xl">
            
            {/* 1. CYBER SCAN LINE (The moving line from your HTML) */}
            <div className="absolute inset-0 z-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF00FF]/40 to-transparent opacity-0 group-hover:animate-scan group-hover:opacity-100" />

            {/* 2. CARD CONTENT AREA */}
            <div className="relative z-10 p-6">
              {/* Top Row: Title & Cyber-lines */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#FF00FF] text-[10px] font-black uppercase tracking-[0.3em]">
                  {item.title}
                </h2>
                <div className="flex gap-1">
                  <span className="h-1 w-4 bg-white/10 rounded-full" />
                  <span className="h-1 w-1 bg-[#FF00FF] rounded-full animate-pulse" />
                </div>
              </div>

              {/* Main Text */}
              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line font-medium mb-6">
                {item.content}
              </p>

              {/* 3. SUBTITLE (The "Interactive" part of your HTML) */}
              <div className="flex items-center gap-2 border-t border-white/5 pt-4">
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Status</span>
                <span className="text-[9px] text-[#FF00FF] uppercase tracking-widest font-black shadow-[#FF00FF]/20">
                  {item.highlight}
                </span>
              </div>
            </div>

            {/* 4. GLOWING ELEMENTS (From your CSS) */}
            <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-[#FF00FF]/5 blur-[50px] group-hover:bg-[#FF00FF]/10 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
}