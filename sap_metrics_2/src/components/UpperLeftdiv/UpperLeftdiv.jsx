import React, { useState, useRef, useEffect } from 'react';
import './UpperLeftdiv.css';
// import { cardsData } from '../../Data/Data';

import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
import Cards from '../Cards/Cards';
import CardResponse from '../CardResponse/CardResponse';


Amplify.configure(awsExports);
const client = generateClient();

const UpperLeftdiv = ({ startDate, endDate, setTriggerFunction }) => {

  const ListHealthBackgound = `
      query {
        listHEALTH(filter: {id: {between: ["${startDate}", "${endDate}"]}}, limit: 50) {
          items {
            id
            SAP_BACKGROUND_FREE
            SAP_BACKGROUND_TOTAL
            SAP_BACKGROUND_USAGE
          }
        }
      }
    `;

  async function fetchHealth() {
      const result = await client.graphql({
        query: ListHealthBackgound,
      })
      console.log(result.data.listHEALTH.items)
  };

  useEffect(() => {
    // Pass fetchHealth function to App.js using the setTriggerFunction
    setTriggerFunction(() => fetchHealth);

    console.log("UpperRight received variable: ", startDate, endDate);
  }, [startDate, endDate, setTriggerFunction]);

  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected:', event.target.value);
  };

  return (
    <div className="upper_Left">

      <h4 className='title_Upper'>SAP Application Work Process Overview</h4>

      {/* Dropdown filter at the top */}
      <div className="dropdown-filter">
        <label htmlFor="filter">Select Host:</label>
        <select id="filter" value={selectedOption} onChange={handleDropdownChange}>
          <option value="">Select an option</option>
          <option value="option1">rcpg1s4happ1</option>
          <option value="option2">rcpg1s4happ2</option>
        </select>
      </div>

      <h4 className='title'>Work process Utilization</h4>
      <Cards />
      <h4 className='title'>Work process Response Time</h4>
      <CardResponse />
      
    </div>
  )

}

export default UpperLeftdiv