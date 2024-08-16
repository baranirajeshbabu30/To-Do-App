import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="search-container">
    <input 
      type="text" 
      placeholder="Search..." 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)} 
      className="search-input"
    />
  </div>
);

export default SearchBar;
