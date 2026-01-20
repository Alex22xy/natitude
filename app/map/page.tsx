export default function MapPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black px-6">
      {/* Primary Title - Keeping it bold and clean */}
      <h1 className="text-3xl font-black uppercase tracking-[0.4em] text-white">
        The Wild
      </h1>
      
      {/* Space for the Map - The "Coming Soon" placeholder */}
      <div className="mt-10 h-[60vh] w-full max-w-md rounded-[40px] border border-white/10 bg-zinc-900/20 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden">
         {/* Subtle pulsing glow in the center of the "map" */}
         <div className="absolute h-32 w-32 bg-[#FF00FF] opacity-10 blur-[60px] animate-pulse" />
         
         <span className="relative z-10 text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
           Initializing Map...
         </span>
      </div>

      {/* Safe Area for Bottom Nav */}
      <div className="h-24" />
    </div>
  );
}