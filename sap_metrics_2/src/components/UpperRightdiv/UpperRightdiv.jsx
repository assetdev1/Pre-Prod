import React from 'react';
import './UpperRightdiv.css';
import UpperRightLowerdiv from './UpperRightLowerdiv/UpperRightLowerdiv';
import UpperRightUpperdiv from './UpperRightUpperdiv/UpperRightUpperdiv';

const UpperRightdiv = ({ startDate, endDate }) => {
  return (
    <div className="upper_Right">
        <UpperRightUpperdiv startDate={startDate} endDate={endDate} />
        <UpperRightLowerdiv startDate={startDate} endDate={endDate}/>
    </div>
  )
}

export default UpperRightdiv