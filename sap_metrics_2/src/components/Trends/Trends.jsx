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
import { format } from 'date-fns';
import dayjs from 'dayjs';
// import { listSMlGS } from '../../graphql/queries';
import { ListHealth, ListSmlg } from '../../graphql/manipulated_queries';


Amplify.configure(awsExports);
const client = generateClient();

const Trends = () => {
    ////////////////////////////////For date range filter////////////////////////////////////
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [data, setData] = useState([]);

    // Handle Start Date/Time Change
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleStartTimeChange = (e) => setStartTime(e.target.value);

    // Handle End Date/Time Change
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    const handleEndTimeChange = (e) => setEndTime(e.target.value);

    const [sortedHealthDialog, setSortedHealthDialog] = useState([]);
    const [sortedHealthBackground, setSortedHealthBackground] = useState([]);

    // Utility function to format and sort the fetched data
    const processSMLGData = (data) => {
      return data.items.sort((a, b) => b.id.localeCompare(a.id)).map(item => {
        return { 
          reply_item: item
        }
      });
    };

    // Reset the Date and Time fields
    const handleReset = () => {
      setSelectedOption(null); // for auto-scroll
      setStartDate('');
      setStartTime('');
      setEndDate('');
      setEndTime('');
    };

    // Format the selected dates and times into the required format and fetch data
    const handleApply = async () => {
    if (!startDate || !endDate || !startTime || !endTime) {
      alert('Please select both date and time');
      return;
    }

    const fromDate = format(new Date(`${startDate}T${startTime}`), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX").replace('Z', '');
    const toDate = format(new Date(`${endDate}T${endTime}`), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX").replace('Z', '');

    console.log(fromDate)
    console.log(toDate)

    // Build the dynamic query
    const ListHealthDialog = `
      query {
        listHEALTH(filter: {id: {between: ["${fromDate}", "${toDate}"]}}, limit: 31) {
          items {
            id
            SAP_DIALOG_FREE
            SAP_DIALOG_TOTAL
            SAP_DIALOG_USAGE
          }
        }
      }
    `;

    const ListHealthBackgound = `
      query {
        listHEALTH(filter: {id: {between: ["${fromDate}", "${toDate}"]}}, limit: 31) {
          items {
            id
            SAP_BACKGROUND_FREE
            SAP_BACKGROUND_TOTAL
            SAP_BACKGROUND_USAGE
          }
        }
      }
    `;


    // Fetch Data using fromDate and toDate
    await fetchDataWithDateRange(ListHealthDialog, ListHealthBackgound);
  };

  const fetchDataWithDateRange = async (dialogQuery, backgroundQuery) => {
    try {
      // Fetch both datasets simultaneously with dynamic dates
      const [result1, result2] = await Promise.all([
        client.graphql({ query: dialogQuery }),
        client.graphql({ query: backgroundQuery }),
      ]);

      const sorted_result1 = processSMLGData(result1.data.listHEALTH);
      const values_segregated_1 = sorted_result1.map((entry) => {
        const { SAP_DIALOG_FREE, SAP_DIALOG_TOTAL, SAP_DIALOG_USAGE, id } = entry.reply_item; // Destructure the properties you need;
        return {
          sap_dialog_free: SAP_DIALOG_FREE,
          sap_dialog_total: SAP_DIALOG_TOTAL,
          sap_dialog_usage: SAP_DIALOG_USAGE,
          time: id,
        };
      });

      const sorted_result2 = processSMLGData(result2.data.listHEALTH);
      const values_segregated_2 = sorted_result2.map((entry) => {
        const { SAP_BACKGROUND_FREE, SAP_BACKGROUND_TOTAL, SAP_BACKGROUND_USAGE, id } = entry.reply_item; // Destructure the properties you need;
        return {
          sap_background_free: SAP_BACKGROUND_FREE,
          sap_background_total: SAP_BACKGROUND_TOTAL,
          sap_background_usage: SAP_BACKGROUND_USAGE,
          time: id,
        };
      });

      // Store the fetched data in the state
      setSortedHealthDialog(values_segregated_1);
      // console.log(values_segregated_1)
      setSortedHealthBackground(values_segregated_2);
      // console.log(values_segregated_2)
      // setData([...values_segregated_1, ...values_segregated_2]);

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

    /////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////FOR Circle and Graph////////////////////////////////////////////
    // const [sortedHealthDialog, setSortedHealthDialog] = useState([]);
    // const [sortedHealthBackground, setSortedHealthBackground] = useState([]);

    // // Utility function to format and sort the fetched data
    // const processSMLGData = (data) => {
    //   return data.items.sort((a, b) => b.id.localeCompare(a.id)).map(item => {
    //     return { 
    //       reply_item: item
    //     }
    //   });
    // };

    // // Consolidated async function to fetch data
    // useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     // Fetch both datasets simultaneously
    //     const [result1, result2] = await Promise.all([
    //       client.graphql({ query: ListHealthDialog }),
    //       client.graphql({ query: ListHealthDialog }),
    //     ]);

    //     const sorted_result1 = processSMLGData(result1.data.listHEALTH);
    //     // Step 2: Segregate properties into a new variable after processing
    //     const values_segregated_1 = sorted_result1.map(entry => {
    //       const { SAP_DIALOG_FREE, SAP_DIALOG_TOTAL, SAP_DIALOG_USAGE, id } = entry.reply_item; // Destructure the properties you need
    //       return {
    //         sap_dialog_free: SAP_DIALOG_FREE, // Segregate into new variables
    //         sap_dialog_total: SAP_DIALOG_TOTAL,
    //         sap_dialog_usage: SAP_DIALOG_USAGE,
    //         time: id
    //       };
    //     });

    //     const sorted_result2 = processSMLGData(result2.data.listHEALTH);
    //     // Step 2: Segregate properties into a new variable after processing
    //     const values_segregated_2 = sorted_result2.map(entry => {
    //       const { SAP_DIALOG_FREE, SAP_DIALOG_TOTAL, SAP_DIALOG_USAGE, id } = entry.reply_item; // Destructure the properties you need
    //       return {
    //         sap_dialog_free: SAP_DIALOG_FREE, // Segregate into new variables
    //         sap_dialog_total: SAP_DIALOG_TOTAL,
    //         sap_dialog_usage: SAP_DIALOG_USAGE,
    //         time: id
    //       };
    //     });

    //     setSortedHealthDialog(values_segregated_1);
    //     console.log(values_segregated_1)
    //     setSortedHealthBackground(values_segregated_2);
    //     // console.log(values_segregated_2)
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData(); // Trigger data fetch on component mount
    // }, []); // Empty dependency array ensures this runs once when the component mounts

    // Function to format the date in ISO format
    
    const formatDate = (str) => new Date(str).toISOString();

    // const data_2 = sortedHealthDialog.map((item) => {
    //   const x = formatDate(item.time);
    //   const y = Number(item.sap_dialog_free);
    //   const itemDate = item.time.split("T")[0]; // Extract date portion (YYYY-MM-DD)
    //   const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD
    //   // Check if the item's date matches today's date
    //   if (itemDate === today) {
    //     console.log(`Match found for today's date: ${item.time}`);
    //   }
      
    //   // Print each mapping result
    //   console.log(`xx: ${x}, yy: ${y}`);
    
    //   // return { x, y };
    // });

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
        barValue: sortedHealthBackground.find((item) => {
          const itemDate = item.time.split("T")[0];
          const today = new Date().toISOString().split("T")[0];
          return itemDate === today;  // Find item matching today's date
        })?.sap_background_free || 0, // If no match, default to 0
        value: sortedHealthBackground.find((item) => {
          const itemDate = item.time.split("T")[0];
          const today = new Date().toISOString().split("T")[0];
          return itemDate === today;
        })?.sap_background_total || 0, // If no match, default to 0
        png: UilClipboardAlt,
        series: [
          {
            name: 'Review',
            data: sortedHealthBackground.map((item) => ({
              x: formatDate(item.time),
              y: Number(item.sap_background_total - item.sap_background_free),
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

    // // Reset Handler
    // const handleReset = () => {
    //    setSelectedOption(null);
    //
    // };
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
            {/* Start Date and Time */}
            <input 
              type="date" 
              className="date-input" 
              value={startDate} 
              onChange={handleStartDateChange} 
            />
            <input 
              type="time" 
              className="time-input" 
              value={startTime} 
              onChange={handleStartTimeChange} 
            />

            <span className="date-separator">to</span>

            {/* End Date and Time */}
            <input 
              type="date" 
              className="date-input" 
              value={endDate} 
              onChange={handleEndDateChange} 
            />
            <input 
              type="time" 
              className="time-input" 
              value={endTime} 
              onChange={handleEndTimeChange} 
            />

            {/* Apply and Reset Buttons */}
            <button className="apply-button" onClick={handleApply}>
              Apply
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
        </div>
    </>
   
  );
};

export default Trends;
