
import axios from 'axios';
import React, { useEffect } from 'react'
import { userUrl } from '../constants/constant';

const BlockPage = ({user,setblock}) => {
      useEffect(() => {
    user && axios.get(`${userUrl}/api/users/find/${user._id}`).then(data =>{
     // if(localStorage.getItem("user") == JSON.stringify(data.data) ) return;
     localStorage.setItem("user",JSON.stringify(data.data));
     setblock(data.data.isBlocked)
    })
    })
  return (
    <p style={{boxSizing:"border-box",height:"100vh",color:"#ff0000d9",display:'flex',alignItems:"center",justifyContent:"center",fontSize:"3rem",fontWeight:700}}>Your Blocked</p>

  )
}

export default BlockPage