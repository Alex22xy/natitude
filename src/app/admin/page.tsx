'use client';

import { useState, useEffect } from 'react';

/**
 * NATITUDE COMMAND CENTER
 * Secure access point for Tribe management.
 */
export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch members if authenticated
  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/admin/members');
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // 2. Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setIsAuthenticated(true);
      fetchMembers();
    } else {
      setError('ACCESS DENIED: INVALID FREQUENCY');
    }
  };

  // 3. Handle Member Approval
  const approveMember = async (id: string) => {
    const res = await fetch('/api/admin/members/approve', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      // Refresh the list to show the updated 'approved' status
      fetchMembers();
    }
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono p-4">
        <div className="border border-[#ff00ff] p-8 max-w-md w-full text-center">
          <h1 className="text-[#ff00ff] text-2xl mb-6 tracking-widest">ADMIN_AUTH</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="ENTER SECRET KEY"
              className="w-full bg-black border border-white p-3 text-center outline-none focus:border-[#ff00ff]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-[#ff00ff] text-black font-bold p-3 hover:bg-white transition-colors">
              DECRYPT
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-xs">{error}</p>}
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-black text-white font-mono p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end border-b border-[#ff00ff] pb-4 mb-8">
          <div>
            <h1 className="text-[#ff00ff] text-3xl tracking-tighter font-bold">NATITUDE_SYSTEMS</h1>
            <p className="text-xs opacity-50">AUTHORIZED ACCESS ONLY // TRIBE_DATABASE</p>
          </div>
          <div className="text-right">
            <p className="text-[#ff00ff]">{members.length}</p>
            <p className="text-[10px] uppercase">Active Seekers</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-[10px] uppercase tracking-widest text-[#ff00ff]">
                <th className="py-4 px-2">Joined</th>
                <th className="py-4 px-2">Name</th>
                <th className="py-4 px-2">Email</th>
                <th className="py-4 px-2">Instagram</th>
                <th className="py-4 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {members.map((member: any) => (
                <tr key={member._id} className="border-b border-zinc-900 hover:bg-zinc-950 transition-colors">
                  <td className="py-4 px-2 opacity-50">
                    {new Date(member.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-2 font-bold">{member.fullName}</td>
                  <td className="py-4 px-2 text-zinc-400">{member.email}</td>
                  <td className="py-4 px-2 text-[#ff00ff]">
                    <a href={`https://instagram.com/${member.instagram?.replace('@', '')}`} target="_blank" rel="noreferrer">
                      {member.instagram}
                    </a>
                  </td>
                  <td className="py-4 px-2 uppercase text-[10px]">
                    {member.status === 'pending' ? (
                      <button 
                        onClick={() => approveMember(member._id)}
                        className="border border-[#ff00ff] text-[#ff00ff] px-2 py-1 hover:bg-[#ff00ff] hover:text-black transition-colors"
                      >
                        APPROVE
                      </button>
                    ) : (
                      <span className="border border-green-500 text-green-500 px-2 py-1">
                        APPROVED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {members.length === 0 && !loading && (
            <div className="py-20 text-center opacity-30 italic">No transmissions found in the archive.</div>
          )}
        </div>
      </div>
    </div>
  );
}