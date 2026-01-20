import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-8">
      <div className="relative w-full max-w-[500px] transition-all duration-700 hover:scale-105">
        {/* Subtle background glow to make the pink script pop */}
        <div className="absolute -inset-4 rounded-full bg-[#FF00FF] opacity-10 blur-3xl" />
        
        <Image 
          src="/assets/logo.svg" 
          alt="Natitude Logo"
          width={800} 
          height={500}
          // This is the "Quickness" secret:
          priority 
          loading="eager"
          // This tells the browser to reserve the space immediately
          fetchPriority="high" 
          className="object-contain"
        />
      </div>
    </main>
  );
}