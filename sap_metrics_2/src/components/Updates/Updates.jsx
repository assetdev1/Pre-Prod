import React from 'react'
import './Updates.css'
import { UpdatesData } from '../../Data/Data'

const Updates = () => {
  return (
    <div className='Updates'>
      {UpdatesData.map((update)=>(
          <div className='update'>
            <img src={update.img} alt="" />
            <div className='noti'>
              <div style={{marginBottom: '0.5rem'}}>
                <span>{update.name}</span>
                <span> {update.noti}</span>
                <span className='nextLine'>{update.time}</span>
              </div>
            </div>
          </div>
      ))}
    </div>
  );
};

export default Updates


