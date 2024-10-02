import React, { useState } from 'react';
import './UpperRightLowerdiv.css';
import UpperRightLowerBox from '../UpperRightLowerBox/UpperRightLowerBox';
import { UilClipboardAlt } from "@iconscout/react-unicons";

const UpperRightLowerdiv = ({ startDate, endDate, setTriggerFunction }) => {

  const [available, setAvailable] = useState(false); // You can initialize it with true or false

  const cardsDataIfAvailable = [
    {
      title: "Available",
      color: {
        backGround: "linear-gradient(180deg, #6AD79E 0%, #4BBF73 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 100,
      value: "25,970",
      png: UilClipboardAlt,
      series: [
        {
          name: 'Available',
          data: [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
        }, 
        {
          name: 'Unavailable',
          data: [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
        }
      ],
    },
  ]

  const cardsDataIfUnavailable = [
    {
      title: "Unavailable",
      color: {
        backGround: "linear-gradient(180deg, #FF6B6B 0%, #D64545 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 100,
      value: "25,970",
      png: UilClipboardAlt,
      series: [
          {
            name: 'Available',
            data: [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
          }, 
          {
            name: 'Unavailable',
            data: [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
          }
        ]
      },
  ];

  return (
    <div className="upper_Right_lower">
      {available
      ? cardsDataIfAvailable.map((card) => (
          <div className="parentContainerURL" key={card.title}>
            <UpperRightLowerBox
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        ))
      : cardsDataIfUnavailable.map((card) => (
          <div className="parentContainerURL" key={card.title}>
            <UpperRightLowerBox
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        ))} 
    </div>
  )
}

export default UpperRightLowerdiv