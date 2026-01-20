export default function UserProfilePage() {
  // Since this is the main /profile page, we can use a placeholder 
  // or pull the actual logged-in user data here later.
  const username = "Member"; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-black">
      <div className="w-full max-w-md p-10 rounded-[32px] border border-white/10 bg-zinc-900/30 backdrop-blur-2xl text-center">
        <div className="w-20 h-20 bg-[#FF00FF] rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.4)]">
          <span className="text-2xl font-black text-black">
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">@{username}</h1>
        <p className="text-white/40 text-sm uppercase tracking-widest font-bold">
          Natitude Member
        </p>
      </div>
    </div>
  );
}