import React from 'react';
import './Upperdiv.css';
import UpperLeftdiv from '../UpperLeftdiv/UpperLeftdiv';
import UpperRightdiv from '../UpperRightdiv/UpperRightdiv';

const Upperdiv = ({ startDate, endDate, setTriggerFunction }) => {
  return (
    <div className="upper">
      <UpperLeftdiv startDate={startDate} endDate={endDate} setTriggerFunction={setTriggerFunction} />          
      <UpperRightdiv startDate={startDate} endDate={endDate} setTriggerFunction={setTriggerFunction} />          
    </div>
  )
}

export default Upperdiv