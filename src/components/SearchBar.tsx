
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`flex items-center rounded-full transition-all duration-300 ${
        isFocused 
          ? 'bg-white shadow-md dark:bg-harmonic-800' 
          : 'bg-harmonic-200/50 dark:bg-harmonic-800/50'
      }`}
    >
      <div className="pl-3">
        <Search className="h-4 w-4 text-harmonic-500" />
      </div>
      <input
        type="text"
        placeholder="Search artists, tracks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="py-2 px-3 text-sm bg-transparent rounded-full w-40 focus:w-60 transition-all duration-300 focus:outline-none"
      />
    </form>
  );
};

export default SearchBar;
