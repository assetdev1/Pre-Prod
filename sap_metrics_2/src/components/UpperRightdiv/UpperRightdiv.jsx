import React from 'react';
import './UpperRightdiv.css';
import UpperRightLowerdiv from './UpperRightLowerdiv/UpperRightLowerdiv';
import UpperRightUpperdiv from './UpperRightUpperdiv/UpperRightUpperdiv';

const UpperRightdiv = ({ startDate, endDate, setTriggerFunction }) => {
  return (
    <div className="upper_Right">
        <UpperRightUpperdiv startDate={startDate} endDate={endDate} setTriggerFunction={setTriggerFunction} />
        <UpperRightLowerdiv startDate={startDate} endDate={endDate} setTriggerFunction={setTriggerFunction} />
    </div>
  )
}

export default UpperRightdiv