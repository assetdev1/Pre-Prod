import React, {useState} from 'react'
import './Box.css'
import { AnimateSharedLayout } from 'framer-motion';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UilTimes } from '@iconscout/react-unicons'; 
import Chart from 'react-apexcharts';
import { listSMlGS } from 'D:/SAP_METRICS/new_sap_metrics/src/graphql/queries';
import { Amplify } from 'aws-amplify';
import awsExports from 'D:/SAP_METRICS/new_sap_metrics/src/aws-exports';
import { generateClient } from 'aws-amplify/api';


Amplify.configure(awsExports);
const client = generateClient();

const Box = (props) => {

    const [expanded, setExpanded] = useState(false)

    // async function to fetchSMLG
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
        // setSortedSMLG(sortedSMLG);
    }


    
    function CompactCard ({ param, setExpanded }) {
        const Png = param.png
        return(
            <div className='CompactCard' style={{background: param.color.backGround, boxShadow: param.color.boxShadow}} onClick={() => { setExpanded(); fetchSMLG(); }} layoutId='expandableCard'>
                <div className='radialBar'>
                    <CircularProgressbar value={param.barValue} text={`${param.barValue}%`} />
                    <span>{param.title}</span>
                </div>
                <div className="detail">
                    <Png />
                    <span>{param.value}</span>
                    <span>Last 24 hours</span>
                </div>
            </div>
        );
    }
    
    function ExpandedBox ({ param, setExpanded }){
    
        const data = {
            options: {
                chart: {
                    type: "area",
                    height: "auto",
                },
    
                dropShadow: {
                    enabled: false,
                    enabledOnSeries: undefined,
                    top: 0,
                    left: 0,
                    blur: 3,
                    color: "#000",
                    opacity: 0.35,
                },
    
                fill: {
                    colors: ["#fff"],
                    type: 'gradient',
                },
    
                dataLabels: {
                enabled: false,
                },
    
                stroke: {
                curve: "smooth",
                colors: ["white"],
                },
    
                tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",
                },
                },
    
                grid: {
                show: true,
                },
    
                xaxis: {
                type: "datetime",
                categories: [
                    "2018-09-19T00:00:00.000Z",
                    "2018-09-19T01:30:00.000Z",
                    "2018-09-19T02:30:00.000Z",
                    "2018-09-19T03:30:00.000Z",
                    "2018-09-19T04:30:00.000Z",
                    "2018-09-19T05:30:00.000Z",
                    "2018-09-19T06:30:00.000Z",
                    ],
                },
              },
        };
    
        return(
            <div className='ExpandedBox' style={{background: param.color.backGround, boxShadow: param.color.boxShadow}} layoutId='expandableCard'>
                <div style={{alignSelf: 'flex-end', cursor: 'pointer', color: 'white'}}>
                    <UilTimes onClick={setExpanded}/>
                </div>
                <span>{param.title}</span>
                <div className='chartContainer'>
                    <Chart series={param.series} type='area' options={data.options}/>         
                </div>
                <span>Last 24 hours</span>                   
            </div>
        );
    }  
    
    return (
        <AnimateSharedLayout>
            {
                expanded ? (
                    <ExpandedBox param = {props} setExpanded={()=>setExpanded(false)}/>
                ) : (
                    <CompactCard param = {props} setExpanded={()=>setExpanded(true)}/>
                )
            }
        </AnimateSharedLayout>
      )
    }

export default Box
