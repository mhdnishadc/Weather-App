export default function AboutPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">About This App</h1>
      <p>
        This is a full-stack weather web application built using Next.js and Tailwind CSS
        on the frontend and Express.js on the backend.
      </p>
      <p className="mt-2">
        It fetches real-time weather data using the OpenWeatherMap API based on your
        geolocation and city searches.
      </p>
    </main>
  )
}
