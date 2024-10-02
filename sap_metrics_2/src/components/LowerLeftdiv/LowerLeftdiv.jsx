import React from 'react';
import './LowerLeftdiv.css';
import LowerLeftLowerdiv from '../LowerLeftdiv/LowerLeftLowerdiv/LowerLeftLowerdiv';
import LowerLeftUpperdiv from '../LowerLeftdiv/LowerLeftUpperdiv/LowerLeftUpperdiv';

const LowerLeftdiv = ({ startDate, endDate, setTriggerFunction }) => {
  return (
    <div className="lower_Left">
      <h4 className='title_Lower'>Jobs Overview</h4>
      <LowerLeftUpperdiv />
      <LowerLeftLowerdiv />
    </div>
  )
}

export default LowerLeftdiv