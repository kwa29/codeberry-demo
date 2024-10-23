import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="relative max-w-md w-full mx-4">
      <input
        type="text"
        placeholder="Search photos..."
        className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-full
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   transition-shadow duration-200"
      />
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
};

export default SearchBar;