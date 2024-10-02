import React, { useState, useRef, useEffect } from 'react';
import './LowerRightdiv.css';
import LowerRightLowerdiv from '../LowerRightdiv/LowerRightLowerdiv/LowerRightLowerdiv';
import LowerRightUpperdiv from '../LowerRightdiv/LowerRightUpperdiv/LowerRightUpperdiv';

const LowerRightdiv = ({ startDate, endDate, setTriggerFunction }) => {

  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected:', event.target.value);
  };

  return (
    <div className="lower_Right">
      <h4 className='title_Lower'>Server Statistics</h4>
      <div className="dropdown-filter">
        <label htmlFor="filter">Select Host:</label>
        <select id="filter" value={selectedOption} onChange={handleDropdownChange}>
          <option value="">Select an option</option>
          <option value="option1">rcpg1s4happ1</option>
          <option value="option2">rcpg1s4happ2</option>
        </select>
      </div>
      <LowerRightUpperdiv />
      <LowerRightLowerdiv />
    </div>
  )
}

export default LowerRightdiv