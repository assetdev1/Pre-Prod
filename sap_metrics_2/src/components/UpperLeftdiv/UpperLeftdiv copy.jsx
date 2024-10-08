import React, { useState, useRef, useEffect } from 'react';
import './UpperLeftdiv.css';

import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';

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

  return (
    <div className="upper_Left">
        {/* Space for future content */}
    </div>
  )

}

export default UpperLeftdiv