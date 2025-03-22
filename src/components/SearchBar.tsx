
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        if (query.trim() === '') {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClick = () => {
    setIsExpanded(true);
    setIsFocused(true);
    inputRef.current?.focus();
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`flex items-center rounded-full transition-all duration-300 ${
        isFocused 
          ? 'bg-white shadow-md dark:bg-harmonic-800' 
          : 'bg-harmonic-200/50 dark:bg-harmonic-800/50'
      }`}
      onClick={handleClick}
    >
      <div className="pl-3">
        <Search className="h-4 w-4 text-harmonic-500" />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search artists, tracks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          setIsExpanded(true);
        }}
        className={`py-2 px-3 text-sm bg-transparent rounded-full transition-all duration-300 outline-none ${
          isExpanded ? 'w-60 md:w-80' : 'w-40'
        }`}
      />
    </form>
  );
};

export default SearchBar;
