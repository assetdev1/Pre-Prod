import React, { useState } from 'react';
import './UpperRightLowerBox.css'
import { AnimateSharedLayout } from 'framer-motion';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UilTimes } from '@iconscout/react-unicons'; 
import Chart from 'react-apexcharts';

const UpperRightLowerBox = (props) => {
    const [expanded, setExpanded] = useState(false)
  return (
    <AnimateSharedLayout>
        {
            expanded ? (
                <ExpandedCard param = {props} setExpanded={()=>setExpanded(false)}/>
            ) : (
                <CompactCard param = {props} setExpanded={()=>setExpanded(true)}/>
            )
        }
    </AnimateSharedLayout>
  )
}

function CompactCard ({ param, setExpanded }) {
    const Png = param.png
    return(
        <div className='CompactCardURLBox' style={{background: param.color.backGround, boxShadow: param.color.boxShadow}} onClick={setExpanded} layoutId='expandableCard'>
            <div className='radialBarURLBox'>
                <CircularProgressbar value={param.barValue} text={`${param.barValue}%`} />
                <span>{param.title}</span>
            </div>
        </div>
    );
}

function ExpandedCard ({ param, setExpanded }){

    const data = {
        options: {
        //     series: [{
        //     name: 'Marine Sprite',
        //     data: [44, 55, 41, 37, 22, 43, 21]
        //   }, {
        //     name: 'Striking Calf',
        //     data: [53, 32, 33, 52, 13, 43, 32]
        //   }, {
        //     name: 'Tank Picture',
        //     data: [12, 17, 11, 9, 15, 11, 20]
        //   }, {
        //     name: 'Bucket Slope',
        //     data: [9, 7, 5, 8, 6, 9, 4]
        //   }, {
        //     name: 'Reborn Kid',
        //     data: [25, 12, 19, 32, 25, 24, 10]
        //   }],
            chart: {
            type: 'bar',
            height: 650,
            stacked: true,
            stackType: '100%'
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          title: {
            text: '100% Stacked Bar'
          },
          xaxis: {
            categories: ['2024-09-20', '2024-09-21', '2024-09-22', '2024-09-23', '2024-09-24', '2024-09-25', '2024-09-26', '2024-09-27', '2024-09-28', '2024-09-29', '2024-09-30', '2024-09-31', '2024-10-01', '2024-10-02'],
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "K"
              }
            }
          },
          fill: {
            opacity: 1
          
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
        }
    };

    return(
        <div className='ExpandedCardURLBox' style={{background: param.color.backGround, boxShadow: param.color.boxShadow}} layoutId='expandableCard'>
            <div style={{alignSelf: 'flex-end', cursor: 'pointer', color: 'white'}}>
                <UilTimes onClick={setExpanded}/>
            </div>
            <span>{param.title}</span>
            <div className='chartContainerURLBox'>
                <Chart series={param.series} type='bar' options={data.options}/>         
            </div>
            <span>Last 24 hours</span>                   
        </div>
    );
}

export default UpperRightLowerBox;
