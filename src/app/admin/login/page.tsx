'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="glass-panel p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/50 border border-[var(--color-border-card)] rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/50 border border-[var(--color-border-card)] rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors"
            />
          </div>
          <button type="submit" className="glow-button w-full py-3 rounded mt-4 font-bold">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
