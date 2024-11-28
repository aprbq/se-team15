import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative flex items-center bg-white border border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
      <Search className="text-gray-400 h-5 w-5 ml-3" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search orders..."
        className="w-full pl-3 pr-4 py-2 bg-transparent border-none focus:outline-none text-gray-200 placeholder-black"
      />
    </div>
  );
};