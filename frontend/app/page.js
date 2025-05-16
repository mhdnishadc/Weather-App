'use client'

import { useEffect, useState } from 'react'
import WeatherCard from '@/components/WeatherCard'
import SearchBar from '@/components/SearchBar'
import Sidebar from '@/components/Sidebar'

export default function HomePage() {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/weather/current?lat=${latitude}&lon=${longitude}`
      )
      const data = await res.json()
      setWeather(data)
    })
  }, [])

  const handleSearch = async (city) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/weather?city=${city}`)
    const data = await res.json()
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city })
    })
    setWeather(data)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        {weather ? <WeatherCard data={weather} /> : <p>No weather data found.</p>}
      </main>
    </div>
  )
}
