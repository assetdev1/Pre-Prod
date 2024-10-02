import React from 'react';
import './LowerMiddlediv.css';
import LowerMiddleLowerdiv from './LowerMiddleLowerdiv/LowerMiddleLowerdiv';
import LowerMiddleUpperdiv from './LowerMiddleUpperdiv/LowerMiddleUpperdiv';

const LowerMiddlediv = ({ startDate, endDate, setTriggerFunction }) => {
  return (
    <div className="lower_Middle">
        <h4 className='title_Lower'>Health Monitoring</h4>
        <LowerMiddleUpperdiv />
        <LowerMiddleLowerdiv />
    </div>
  )
}

export default LowerMiddlediv