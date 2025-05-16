import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  return (
    <div className="flex gap-2 my-4">
      <input
        type="text"
        placeholder="Enter city"
        className="p-2 border rounded w-full"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => onSearch(city)}>
        Search
      </button>
    </div>
  );
}
