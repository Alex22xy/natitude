import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-8">
      <div className="relative w-full max-w-[600px]">
        {/* Glow behind the transparent SVG */}
        <div className="absolute -inset-10 rounded-full bg-[#FF00FF] opacity-15 blur-3xl" />
        
        <Image 
          src="/assets/logo.svg" 
          alt="Natitude Logo" 
          width={800} 
          height={500}
          priority
          className="relative object-contain drop-shadow-[0_0_20px_rgba(255,0,255,0.5)]"
        />
      </div>
    </main>
  );
}