export default function EventDetailsPage({ params }: { params: { eventId: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-black">
      <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md">
        <h1 className="text-sm font-black text-natitude-pink uppercase tracking-[0.2em] mb-4">
          Event Details
        </h1>
        <h2 className="text-3xl font-bold text-white mb-2">
          Coming Soon
        </h2>
        <p className="text-white/40 text-xs font-mono uppercase">
          ID: {params.eventId}
        </p>
      </div>
    </div>
  );
}