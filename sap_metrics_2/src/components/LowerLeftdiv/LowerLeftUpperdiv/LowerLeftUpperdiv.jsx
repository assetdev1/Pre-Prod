import React from 'react';
import './LowerLeftUpperdiv.css';
import LowerLeftUpperBox from '../LowerLeftUpperBox/LowerLeftUpperBox';
import { UilClipboardAlt } from "@iconscout/react-unicons";

const LowerLeftUpperdiv = () => {

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
        },
        {
          title: "Update WP Utilization",
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
        }
      ];

  return (
    <div className='CardsLLU'>
      {cardsData.map((card)=> {
        return(
            <div className="parentContainerLLU">
                <LowerLeftUpperBox title={card.title} color={card.color} barValue={card.barValue} value={card.value} png={card.png} series={card.series} />
            </div>
        )
      })}
    </div>
  )
}

export default LowerLeftUpperdiv