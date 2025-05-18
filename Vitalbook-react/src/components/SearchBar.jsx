//searchbar - pro rychlejsí vyhledání pacientů podle jmena
import React from 'react';

function SearchBar({ query, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
