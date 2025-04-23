import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log('Searching for:', query);
  };
  
  return (
    <form 
      onSubmit={handleSearch}
      className="relative max-w-2xl mx-auto w-full"
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for dishes, ingredients, or cuisines..."
          className="w-full bg-white/90 backdrop-blur-sm text-black rounded-full py-4 pl-6 pr-12 shadow-xl outline-none focus:ring-2 focus:ring-red-500 transition-all"
        />
        <button 
          type="submit"
          className="absolute right-2 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
}