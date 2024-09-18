import React, { useState, useRef, useEffect } from 'react'
import { Link } from "react-router-dom";
import './Trends.css';
// import { trendsData } from '../../Data/Data';
import Box from '../Box/Box';
import { UilClipboardAlt } from "@iconscout/react-unicons";
import { listSMlGS } from 'D:/SAP_METRICS/new_sap_metrics/src/graphql/queries';
import { Amplify } from 'aws-amplify';
import awsExports from 'D:/SAP_METRICS/new_sap_metrics/src/aws-exports';
import { generateClient } from 'aws-amplify/api';
import dayjs from 'dayjs';

Amplify.configure(awsExports);
const client = generateClient();

const Trends = () => {

    const [sortedSMLG1, setSortedSMLG1] = useState([]);
    const [sortedSMLG2, setSortedSMLG2] = useState([]);
    // Refs for parent containers and for fetching data
    const parentRefs = useRef([]); 

    // Utility function to format and sort the fetched data
    const processSMLGData = (data) => {
      return data.items.sort((a, b) => {
        const timeA = new Date(a.TIME.slice(0, 10) + ' ' + a.TIME.slice(10));
        const timeB = new Date(b.TIME.slice(0, 10) + ' ' + b.TIME.slice(10));
        return timeA - timeB;
      });
    };

    // Consolidated async function to fetch data
    useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both datasets simultaneously
        const [result1, result2] = await Promise.all([
          client.graphql({ query: listSMlGS }),
          client.graphql({ query: listSMlGS }),
        ]);

        setSortedSMLG1(result1.data.listSMlGS.items);
        console.log(result1.data.listSMlGS.items)
        setSortedSMLG2(result2.data.listSMlGS.items);
        console.log(result2.data.listSMlGS.items)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Trigger data fetch on component mount
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // Utility function to format dates
    const formatDate = (str) => new Date(str.slice(0, 10) + ' ' + str.slice(10));

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
              x: formatDate(item.TIME),
              y: Number(item.SAP_RESPONSE_TIME),
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
              x: formatDate(item.TIME),
              y: Number(item.SAP_RESPONSE_TIME),
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

  return (
    <>
      <div className='TrendDash'>
        <h1>Trend Page</h1>
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
