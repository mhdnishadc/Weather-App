export default function WeatherCard({ data }) {
  // Handle WeatherAPI.com format
  if (data && data.current && data.location) {
    return (
      <div className="bg-shadow p-6 rounded">
        <h2 className="text-2xl">{data.location.name}</h2>
        <p>{data.current.condition.text}</p>
        <img src={data.current.condition.icon} alt={data.current.condition.text} />
        <p>Temp: {data.current.temp_c}°C</p>
        <p>Humidity: {data.current.humidity}%</p>
        <p>Wind: {(data.current.wind_kph / 3.6).toFixed(1)} m/s</p>
      </div>
    );
  }

  // Fallback for OpenWeatherMap format (if you ever switch)
  if (data && data.weather && data.weather[0]) {
    return (
      <div className="bg-shadow p-6 rounded">
        <h2 className="text-2xl">{data.name}</h2>
        <p>{data.weather[0].main}</p>
        <p>Temp: {data.main?.temp}°C</p>
        <p>Humidity: {data.main?.humidity}%</p>
        <p>Wind: {data.wind?.speed} m/s</p>
      </div>
    );
  }

  return <div>No weather data available.</div>;
}