import React from 'react'

import { generateClient } from 'aws-amplify/api';
import { listSMlGS } from '../graphql/queries';

import { useState } from 'react';
import dayjs from 'dayjs';

const client = generateClient();

function Data() {

  const [sortedSMLG, setSortedSMLG] = useState([]);

    async function fetchSMLG() {
        const result = await client.graphql({
          query: listSMlGS,
        });
        const sortedSMLG = result.data.listSMlGS.items;
        
        sortedSMLG.sort((a, b) => {
        const timeA = a.TIME.slice(0, 10) + ' ' + a.TIME.slice(10);
        const timeB = b.TIME.slice(0, 10) + ' ' + b.TIME.slice(10);
        return new Date(timeA) - new Date(timeB);
      });
        console.log(sortedSMLG);
        setSortedSMLG(sortedSMLG);
    }

    const xAxisData = sortedSMLG.map(item => item.TIME);
    const yAxisData = sortedSMLG.map(item => item.SAP_RESPONSE_TIME);

    // Function to insert space and convert to date
  const formatDate = (str) => {
    return new Date(str.slice(0, 10) + " " + str.slice(10));
  };

  // Format x-axis data with date objects
  const formattedDates = xAxisData.map((dateStr) => formatDate(dateStr)); 

return (
  <div>
    test
  </div>
  )
}

export default Data
