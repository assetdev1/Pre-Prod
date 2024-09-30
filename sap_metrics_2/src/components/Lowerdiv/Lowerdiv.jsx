import React from 'react';
import './Lowerdiv.css';
import LowerLeftdiv from '../LowerLeftdiv/LowerLeftdiv';
import LowerMiddlediv from '../LowerMiddlediv/LowerMiddlediv';
import LowerRightdiv from '../LowerRightdiv/LowerRightdiv';

const Lowerdiv = ({ startDate, endDate, setTriggerFunction }) => {
  return (
    <div className="lower">
        <LowerLeftdiv startDate={startDate} endDate={endDate} setTriggerFunction={setTriggerFunction} />
        <LowerMiddlediv startDate={startDate} endDate={endDate} setTriggerFunction={setTriggerFunction} />     
        <LowerRightdiv startDate={startDate} endDate={endDate} setTriggerFunction={setTriggerFunction} />
    </div>
  )
}

export default Lowerdiv