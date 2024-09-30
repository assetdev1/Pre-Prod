import React from 'react';
import './CardResponse.css';
// import { cardsData } from '../../Data/Data';
import CardResponseBox from '../CardResponseBox/CardResponseBox';
import { UilClipboardAlt } from "@iconscout/react-unicons";


const CardResponse = () => {

  const cardsData = [
    {
      title: "Dialog WP Response Time",
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
      title: "Update WP Response Time",
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
      title: "Batch WP Response Time",
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
      title: "Spool WP Response Time",
      color: {
        backGround: "linear-gradient(rgb(200, 220, 120) -146.42%, rgb(211 203 255) -46.42%)",
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
    
  ];
  
  return (
    <div className='Cards'>
      {cardsData.map((card)=> {
        return(
            <div className="parentContainer">
                <CardResponseBox title={card.title} color={card.color} barValue={card.barValue} value={card.value} png={card.png} series={card.series} />
            </div>
        )
      })}
    </div>
  )
}

export default CardResponse
