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
import { ListHealth, ListSmlg } from '../../graphql/manipulated_queries';


Amplify.configure(awsExports);
const client = generateClient();

const Trends = () => {

    //////////////////////////////SMLG////////////////////////////////////////////
    const [sortedSMLG1, setSortedSMLG1] = useState([]);
    const [sortedSMLG2, setSortedSMLG2] = useState([]);

    // Utility function to format and sort the fetched data
    const processSMLGData = (data) => {
      return data.items.sort((a, b) => a.TIME.localeCompare(b.TIME)).map(item => {
        return { 
          sap_response_time: item.SAP_RESPONSE_TIME, time: item.TIME
        }
      });
    };

    // Consolidated async function to fetch data
    useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both datasets simultaneously
        const [result1, result2] = await Promise.all([
          client.graphql({ query: ListSmlg }),
          client.graphql({ query: ListSmlg }),
        ]);

        const sorted_result1 = processSMLGData(result1.data.listSMlGS);
        const sorted_result2 = processSMLGData(result2.data.listSMlGS);

        setSortedSMLG1(sorted_result1);
        console.log(sorted_result1)
        setSortedSMLG2(sorted_result2);
        console.log(sorted_result2)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Trigger data fetch on component mount
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // // Utility function to format dates
    // const formatDate = (str) => new Date(str.slice(0, 10) + ' ' + str.slice(10));
    // Function to format the date in ISO format
    const formatDate = (str) => new Date(str).toISOString();

    const data_2 = sortedSMLG1.map((item) => {
      const x = formatDate(item.time);
      const y = Number(item.sap_response_time);
      
      // Print each mapping result
      console.log(`xx: ${x}, yy: ${y}`);
    
      // return { x, y };
    });

    // console.log(data_2)

    // Trends Data
    const trendsData = [
      {
        title: "Dialog Response Time",
        color: {
          backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
          boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 85,
        value: "25,970",
        png: UilClipboardAlt,
        series: [
          {
            name: 'Review',
            data: sortedSMLG1.map((item) => ({
              x: formatDate(item.time),
              y: Number(item.sap_response_time),
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
            data: sortedSMLG2.map((item) => ({
              x: formatDate(item.time),
              y: Number(item.sap_response_time),
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
  
    const dropdownOptions = ['Dialog Response Time', 'System Dumps', 'Batch Jobs', 'Peak CPU Utilization', 'Memory Usage', 'Disk Usage'];
  
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

    /////////////////////////////////Health//////////////////////////////////////
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
                  <span>Usage: {usage} </span>
                </div>
              </div>
            );
          })}
      </div>

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
