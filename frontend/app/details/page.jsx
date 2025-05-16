'use client'
import WeatherCard from '@/components/WeatherCard'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


export default function DetailsPage() {
  const searchParams = useSearchParams()
  const city = searchParams.get('city')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/weather?city=${city}`)
          const data = await res.json()
          console.log('API data:', data) 
          setWeather(data)
        } catch (error) {
          console.error('Failed to fetch weather data', error)
          setWeather(null)
        } finally {
          setLoading(false)
        }
      }
      fetchWeather()
    }
  }, [city])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weather Details for {city}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : weather && (weather.current && weather.location || weather.main) ? (
        <WeatherCard data={weather} />
      ) : (
        <p>Weather data not available.</p>
      )}
    </main>
  )
}
