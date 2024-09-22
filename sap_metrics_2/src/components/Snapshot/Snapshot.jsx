import React, { useState, useRef, useEffect } from 'react'
import { Link } from "react-router-dom";
import './Snapshot.css';
import { ListHealth, ListSmlg } from '../../graphql/manipulated_queries';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { generateClient } from 'aws-amplify/api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

Amplify.configure(awsExports);
const client = generateClient();

const Snapshot = () => {

  /////////////////////////////////Health WP//////////////////////////////////////
  const [data, setData] = useState({
    dialog: { total: 100, free: 50, usage: 0 },
    background: { total: 200, free: 100, usage: 0 },
    spool: { total: 300, free: 150, usage: 0 },
    update: { total: 400, free: 200, usage: 0 }
  }); // default values for demo
  const [hoverIndex, setHoverIndex] = useState(null);

  const [health, setHealth] = useState([]);

  // Fetch data from DynamoDB via GraphQL
  useEffect(() => {
    async function fetchHealth() {
      try {
        const result = await client.graphql({
          query: ListHealth,
        })
        console.log(result.data.listHEALTH.items)
        // setHealth(result.data.listHEALTH.items)
        const dialog_total = Number(result.data.listHEALTH.items[0].SAP_DIALOG_TOTAL);
        const dialog_free = Number(result.data.listHEALTH.items[0].SAP_DIALOG_FREE);
        const dialog_usage = Number(result.data.listHEALTH.items[0].SAP_DIALOG_USAGE);
        
        const background_total = Number(result.data.listHEALTH.items[0].SAP_BACKGROUND_TOTAL);
        const background_free = Number(result.data.listHEALTH.items[0].SAP_BACKGROUND_FREE);
        const background_usage = Number(result.data.listHEALTH.items[0].SAP_BACKGROUND_USAGE);
        
        const spool_total = Number(result.data.listHEALTH.items[0].SAP_SPOOL_TOTAL);
        const spool_free = Number(result.data.listHEALTH.items[0].SAP_SPOOL_FREE);
        const spool_usage = Number(result.data.listHEALTH.items[0].SAP_SPOOL_USAGE);
        
        const update_total = Number(result.data.listHEALTH.items[0].SAP_UPDATE_TOTAL);
        const update_free = Number(result.data.listHEALTH.items[0].SAP_UPDATE_FREE);
        const update_usage = Number(result.data.listHEALTH.items[0].SAP_UPDATE_USAGE);
        setData({ 
          dialog: { total: dialog_total, free: dialog_free, usage: dialog_usage },
          background: { total: background_total, free: background_free, usage: background_usage },
          spool: { total: spool_total, free: spool_free, usage: spool_usage },
          update: { total: update_total, free: update_free, usage: update_usage }
         });
      } catch (error) {
        console.error('Error fetching space data:', error);
      }
    };
    
    fetchHealth();
  }, []);

  // Function to calculate percentage occupied and usage
  const calculateOccupiedPercentage = (total, free) => ((total - free) / total) * 100;
  // const calculateUsage = (total, free) => total - free;

  // Array for rendering multiple categories dynamically with shades of blue
  const categories = ['dialog', 'background', 'spool', 'update'];
  const colors = {
    dialog: '#4A90E2',    // Light blue for dialog
    background: '#007AFF', // Classic blue for background
    spool: '#005EB8',     // Darker blue for spool
    update: '#003366'     // Dark navy blue for update
  };
  ////////////////////////////////////////////////////////////////////////////


  return (
    <div className="snapshot-container">
      <h1>Snapshot Page</h1>

      {/* Highlights section */}
      <div className="highlights-section">
        Highlights
      </div>

        {/* Bottom section with OS and Applications */}
        <div className="bottom-section">
          <div className="os-section">
            OS
          </div>
          <div className="applications-section">
            
            <h2>Work Process Utilizations</h2>
            <div className="circle-container-wrapper">
              {categories.map((category, index) => {
                const total = data[category].total;
                const free = data[category].free;
                const occupiedPercentage = calculateOccupiedPercentage(total, free);
                const usage = data[category].usage;
                // const usage = calculateUsage(total, free);
                return (
                  <div
                    key={category}
                    className="circle-container"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <h3>{category.toUpperCase()}</h3>
                    <CircularProgressbar
                      value={occupiedPercentage}
                      text={hoverIndex === index ? `Free: ${free}` : `${Math.round(occupiedPercentage)}% Occupied`}
                      styles={buildStyles({
                        textSize: '16px',
                        pathColor: colors[category],
                        textColor: '#333',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#f3f3f3',
                      })}
                    />
                    <div className="usage-info">
                      <span>Usage: {total - free}/{total} </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
    </div>
  );
};

export default Snapshot
