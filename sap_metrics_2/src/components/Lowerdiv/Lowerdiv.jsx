import React from 'react';
import './Lowerdiv.css';
import LowerLeftdiv from '../LowerLeftdiv/LowerLeftdiv';
import LowerMiddlediv from '../LowerMiddlediv/LowerMiddlediv';
import LowerRightdiv from '../LowerRightdiv/LowerRightdiv';

const Lowerdiv = ({ startDate, endDate }) => {
  return (
    <div className="lower">
        <LowerLeftdiv startDate={startDate} endDate={endDate} />
        <LowerMiddlediv startDate={startDate} endDate={endDate} />     
        <LowerRightdiv startDate={startDate} endDate={endDate} />
    </div>
  )
}

export default Lowerdiv