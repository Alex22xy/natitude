import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-8">
      {/* 1. Background Video Watermark */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          // Adjusted brightness from 0.4 to 0.7 and opacity from 0.4 to 0.5
          className="h-full w-full object-cover opacity-50 grayscale-[0.1] brightness-[0.7]"
        >
          <source src="/assets/jungle.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay - lightened the top shadow to let more video show through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      {/* 2. Logo Container */}
      <div className="relative z-10 w-full max-w-[600px] transition-transform duration-1000 ease-out hover:scale-105">
        {/* Slightly increased opacity of the glow to keep it popping over a brighter video */}
        <div className="absolute -inset-10 rounded-full bg-[#FF00FF] opacity-15 blur-[120px]" />
        
        <Image 
          src="/assets/logo.svg" 
          alt="Natitude Logo" 
          width={800} 
          height={500}
          priority
          className="relative object-contain drop-shadow-[0_0_30px_rgba(255,0,255,0.4)]"
        />
      </div>

      {/* 3. Subtle Bottom Text */}
      <div className="absolute bottom-32 z-10 animate-pulse">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">
          Welcome to the Jungle
        </p>
      </div>
    </main>
  );
}