'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HistoryPage() {
  const [cities, setCities] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/searches`)
      const data = await res.json()
      setCities(data)
    }
    fetchHistory()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search History</h1>
      <ul>
        {cities.map((city, idx) => (
          <li key={idx}>
            <button
              className="text-blue-600 underline"
  onClick={() => router.push(`/details?city=${encodeURIComponent(city)}`)}

            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
