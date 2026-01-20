export default function FeedPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 px-6">
      <h2 className="text-2xl font-bold text-white tracking-tighter uppercase">
        Live Feed
      </h2>
      <p className="text-white/40 text-sm mt-2">
        Vibes near you will appear here.
      </p>
      
      {/* Test Card to see the UI */}
      <div className="mt-10 w-full max-w-md aspect-[9/16] rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center">
        <span className="text-white/20 font-black rotate-12 text-4xl">NATITUDE</span>
      </div>
    </div>
  );
}