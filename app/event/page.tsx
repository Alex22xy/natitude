export default function EventsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">
          Your Saved Vibes
        </h1>
        <p className="text-white/40 text-sm">
          Events you've bookmarked will appear here.
        </p>
      </div>
      
      {/* This ensures the BottomNav doesn't cover your content */}
      <div className="h-20" /> 
    </div>
  );
}