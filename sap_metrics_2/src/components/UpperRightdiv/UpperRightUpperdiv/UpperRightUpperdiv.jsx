import React from 'react';
import './UpperRightUpperdiv.css';
import UpperRightUpperBox from '../UpperRightUpperBox/UpperRightUpperBox';
import { UilClipboardAlt } from "@iconscout/react-unicons";

const cardsData = [
  {
    title: "Dialog WP Utilization",
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
  }
]

const UpperRightUpperdiv = ({ startDate, endDate, setTriggerFunction }) => {
  return (
    <div className="upper_Right_upper">
        {cardsData.map((card)=> {
        return(
            <div className="parentContainerURU">
                <UpperRightUpperBox title={card.title} color={card.color} barValue={card.barValue} value={card.value} png={card.png} series={card.series} />
            </div>
        )
        })}
    </div>
  )
}

export default UpperRightUpperdiv