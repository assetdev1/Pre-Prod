import React, { useState, useRef, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import './Trends.css';
// import { trendsData } from '../../Data/Data';
import Box from '../Box/Box';
import { UilClipboardAlt } from "@iconscout/react-unicons";
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { generateClient } from 'aws-amplify/api';
import dayjs from 'dayjs';
// import { listSMlGS } from '../../graphql/queries';
import { ListHealth, ListSmlg, ListHealthDialog } from '../../graphql/manipulated_queries';


Amplify.configure(awsExports);
const client = generateClient();

const Trends = () => {

    //////////////////////////////SMLG////////////////////////////////////////////
    const [sortedHealthDialog, setSortedHealthDialog] = useState([]);
    const [sortedSMLG2, setSortedSMLG2] = useState([]);

    // Utility function to format and sort the fetched data
    const processSMLGData = (data) => {
      return data.items.sort((a, b) => b.id.localeCompare(a.id)).map(item => {
        return { 
          reply_item: item
        }
      });
    };

    // Consolidated async function to fetch data
    useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both datasets simultaneously
        const [result1, result2] = await Promise.all([
          client.graphql({ query: ListHealthDialog }),
          client.graphql({ query: ListHealthDialog }),
        ]);

        const sorted_result1 = processSMLGData(result1.data.listHEALTH);
        // Step 2: Segregate properties into a new variable after processing
        const values_segregated_1 = sorted_result1.map(entry => {
          const { SAP_DIALOG_FREE, SAP_DIALOG_TOTAL, SAP_DIALOG_USAGE, id } = entry.reply_item; // Destructure the properties you need
          return {
            sap_dialog_free: SAP_DIALOG_FREE, // Segregate into new variables
            sap_dialog_total: SAP_DIALOG_TOTAL,
            sap_dialog_usage: SAP_DIALOG_USAGE,
            time: id
          };
        });

        const sorted_result2 = processSMLGData(result2.data.listHEALTH);
        // Step 2: Segregate properties into a new variable after processing
        const values_segregated_2 = sorted_result2.map(entry => {
          const { SAP_DIALOG_FREE, SAP_DIALOG_TOTAL, SAP_DIALOG_USAGE, id } = entry.reply_item; // Destructure the properties you need
          return {
            sap_dialog_free: SAP_DIALOG_FREE, // Segregate into new variables
            sap_dialog_total: SAP_DIALOG_TOTAL,
            sap_dialog_usage: SAP_DIALOG_USAGE,
            time: id
          };
        });

        setSortedHealthDialog(values_segregated_1);
        console.log(values_segregated_1)
        setSortedSMLG2(values_segregated_2);
        // console.log(values_segregated_2)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Trigger data fetch on component mount
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // Function to format the date in ISO format
    const formatDate = (str) => new Date(str).toISOString();

    const data_2 = sortedHealthDialog.map((item) => {
      const x = formatDate(item.time);
      const y = Number(item.sap_dialog_free);
      const itemDate = item.time.split("T")[0]; // Extract date portion (YYYY-MM-DD)
      const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD
      // Check if the item's date matches today's date
      if (itemDate === today) {
        console.log(`Match found for today's date: ${item.time}`);
      }
      
      // Print each mapping result
      console.log(`xx: ${x}, yy: ${y}`);
    
      // return { x, y };
    });

    // Trends Data
    const trendsData = [
      {
        title: "Dialog Work Process",
        color: {
          backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
          boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: sortedHealthDialog.find((item) => {
          const itemDate = item.time.split("T")[0];
          const today = new Date().toISOString().split("T")[0];
          return itemDate === today;  // Find item matching today's date
        })?.sap_dialog_free || 0, // If no match, default to 0
        value: sortedHealthDialog.find((item) => {
          const itemDate = item.time.split("T")[0];
          const today = new Date().toISOString().split("T")[0];
          return itemDate === today;
        })?.sap_dialog_total || 0, // If no match, default to 0
        png: UilClipboardAlt,
        series: [
          {
            name: 'Review',
            data: sortedHealthDialog.map((item) => ({
              x: formatDate(item.time),
              y: Number(item.sap_dialog_total - item.sap_dialog_free),
            })),
          },
        ],
      },
      {
        title: "System Dumps",
        color: {
          backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
          boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 35,
        value: "14,270",
        png: UilClipboardAlt,
        series: [
          {
            name: 'Review_2',
            data: sortedHealthDialog.map((item) => ({
              x: formatDate(item.time),
              y: Number(item.sap_dialog_total - item.sap_dialog_free),
            })),
          },
        ],
      },
      {
        title: "Batch Jobs",
        color: {
          backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
          boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
          {
            name: "System Users",
            data: [10, 25, 15, 30, 12, 15, 20],
          },
        ],
      },
      {
        title: "Peak CPU Utilization",
        color: {
          backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
          boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 85,
        value: "25,970",
        png: UilClipboardAlt,
        series: [
          {
            name: "Dialog Users",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
        ],
      },
      {
        title: "Memory Usage",
        color: {
          backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
          boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 35,
        value: "14,270",
        png: UilClipboardAlt,
        series: [
          {
            name: "Service Users",
            data: [10, 100, 50, 70, 80, 30, 40],
          },
        ],
      },
      {
        title: "Disk Usage",
        color: {
          backGround:
            "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
          boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
          {
            name: "System Users",
            data: [10, 25, 15, 30, 12, 15, 20],
          },
        ],
      },
    ];
    //////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////Logic for auto scroll///////////////////////////////////////
    const parentRefs = useRef([]); 
    // State for Dropdown
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    
    // State for Date Range Picker
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(''); 
  
    const dropdownOptions = ['Dialog Work Process', 'System Dumps', 'Batch Jobs', 'Peak CPU Utilization', 'Memory Usage', 'Disk Usage'];
  
    // Dropdown Handlers
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      console.log(`Selected option: ${option}`);

      // Auto-scroll to the matched Box
      const matchedIndex = trendsData.findIndex(card => card.title === option);
      if (matchedIndex !== -1 && parentRefs.current[matchedIndex]) 
        {
      parentRefs.current[matchedIndex].scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    // Date Range Handlers
    const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
      console.log(`Start Date: ${e.target.value}`);
    };
  
    const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
      console.log(`End Date: ${e.target.value}`);
    };

    // Reset Handler
    const handleReset = () => {
      setSelectedOption(null);
      setStartDate('');
      setEndDate('');
    };
    ////////////////////////////////////////////////////////////////////////////

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
    <>
      <div className='TrendDash'>
        <h1>Trending Page</h1>
        <h4>Version 1.0.0</h4>     
        {/* <Link to="/">Go Back</Link>  */}

        {trendsData.map((card, id)=> {
          return(
              <div key={id} className="parentContainer" ref={el => parentRefs.current[id] = el}>
                  <Box title={card.title} color={card.color} barValue={card.barValue} value={card.value} png={card.png} series={card.series} />
              </div>
          )
        })}
      </div>

      {/* New content for the right section */}
      <div  className='right-content'>
        <h3>Filter</h3>
        <div className="combined-component">
        {/* Dropdown Component */}
          <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
              {selectedOption ? selectedOption : 'Select an option'}
              <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9662;</span>
            </button>
            {isOpen && (
              <ul className="dropdown-menu">
                {dropdownOptions.map((option, index) => (
                  <li key={index} className="dropdown-item" onClick={() => handleOptionClick(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

        {/* Date Range Picker Component */}
          <div className="date-range-picker">
            <input 
              type="date" 
              className="date-input" 
              value={startDate} 
              onChange={handleStartDateChange} 
            />
            <span className="date-separator">to</span>
            <input 
              type="date" 
              className="date-input" 
              value={endDate} 
              onChange={handleEndDateChange} 
            />
          </div>

          {/* Reset Button */}
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
   
  );
};

export default Trends;
