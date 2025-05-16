'use client'

import { useRouter } from 'next/navigation'


export default function Sidebar() {
  const router = useRouter()

  return (
    <aside className="w-64  min-h-screen p-6 border-r">
      <h2 className="text-2xl font-bold mb-6">Weather App</h2>
      <nav className="space-y-4">
        <button onClick={() => router.push('/')} className="block hover:underline">
          🌤️ Home
        </button>
        <button onClick={() => router.push('/history')} className="block hover:underline">
          📍 Search History
        </button>
        <button onClick={() => router.push('/about')} className="block hover:underline">
          ℹ️ About
        </button>
      </nav>
    </aside>
  );
}
