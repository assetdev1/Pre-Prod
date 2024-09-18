import React, { useState } from 'react'
import './Sidebar.css'
import Logo from '../../imgs/logo.png'
import PwcLogo from '../../imgs/pwc_logo.png'

// import {UilEstate} from "@iconscout/react-unicons"; //Since added sep in Data.js
import { SidebarData } from '../../Data/Data';
import { UilSignOutAlt, UilBars } from '@iconscout/react-unicons';
import { motion } from 'framer-motion';

import { Link } from "react-router-dom";

const Sidebar = () => {
    const [selected, setSelected] = useState(0)
    const [expanded, setExpanded] = useState(true)

    const sidebarVariants = {
        true:{
            left: '0'
        },
        false:{
            left: '-60%'
        }
    }

  return (
    <>
        <div className='bars' style={expanded ? {left: '60%'} : {left: '5%'}} onClick={() => setExpanded(!expanded)}>
            <UilBars />
        </div>
        <motion.div className="Sidebar" variants={sidebarVariants} animate={window.innerWidth<=768? `${expanded}`:''}>
            <div className='logo'>
                <img src={Logo} alt="" />
                <span className='logo'>
                    {/* P<span>w</span>C */}
                    <img src={PwcLogo} alt="" />
                </span>
            </div>
            <div className='menu'>
                
                {SidebarData.map((item, index)=>{
                    return(
                        <div className={selected===index?'menuItem active': 'menuItem'}
                        key={index}
                        onClick={()=>setSelected(index)}
                        >
                            <Link to={item.route} className="menuLink">
                                <item.icon/>
                                    <span>
                                        {item.heading}
                                    </span>
                            </Link>
                        </div>
                    )
                })}

                <div className='menuItem'>
                    <UilSignOutAlt/>
                </div>
            </div> 
        </motion.div>
    </>
  )
}

export default Sidebar;
