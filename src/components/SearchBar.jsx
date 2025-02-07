//  import React, { useState } from 'react';
 
//  const SearchBar = ({ onSearch }) => {
//     const [query, setQuery] = useState('');
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSearch(query);
//     };
  
//     return (
//       <form onSubmit={handleSubmit} className="mb-4">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Найти город..."
//           className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//       </form>
//     );
//   }

//   export default SearchBar;

import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <div className="p-2 bg-white shadow-lg rounded-lg flex items-center max-w-md flex-shrink-0">
      <input
        type="text"
        placeholder="Введите город..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-48 rounded-md" // Фиксированная ширина
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Найти
      </button>
    </div>
  );
};

export default SearchBar;

