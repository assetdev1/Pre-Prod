import React, { useState, useRef, useEffect } from 'react';
import './LowerRightdiv.css';

const LowerRightdiv = ({ startDate, endDate, setTriggerFunction }) => {

  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected:', event.target.value);
  };

  return (
    <div className="lower_Right">
      {/* Dropdown filter at the top */}
      <div className="dropdown-filter">
        <label htmlFor="filter">Select Filter:</label>
        <select id="filter" value={selectedOption} onChange={handleDropdownChange}>
          <option value="">Select an option</option>
          <option value="option1">rcpg1s4happ1</option>
          <option value="option2">rcpg1s4happ2</option>
        </select>
      </div>
      {/* Space for future content */}
    </div>
  )
}

export default LowerRightdiv