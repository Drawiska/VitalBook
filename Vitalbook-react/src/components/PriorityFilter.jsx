//filtering podle priorit - low high mid
import React from 'react';

function PriorityFilter({ selectedPriority, onChange }) {
  return (
    <div className='filter-dropdownL'>
      <label>Filter by priorities: </label>
      <select value={selectedPriority} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        <option value="high">High</option>
        <option value="normal">Normal</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}

export default PriorityFilter;
