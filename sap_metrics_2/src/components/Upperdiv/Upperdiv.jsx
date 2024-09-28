import React from 'react';
import './Upperdiv.css';
import UpperLeftdiv from '../UpperLeftdiv/UpperLeftdiv';
import UpperRightdiv from '../UpperRightdiv/UpperRightdiv';

const Upperdiv = ({ startDate, endDate, setTriggerFunctionInUpperRight }) => {
  return (
    <div className="upper">
      <UpperLeftdiv startDate={startDate} endDate={endDate} setTriggerFunctionInUpperRight={setTriggerFunctionInUpperRight} />          
      <UpperRightdiv startDate={startDate} endDate={endDate} setTriggerFunctionInUpperRight={setTriggerFunctionInUpperRight} />          
    </div>
  )
}

export default Upperdiv