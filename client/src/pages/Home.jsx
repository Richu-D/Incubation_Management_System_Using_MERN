import React from "react";
import NAV from "../components/nav";
import { useNavigate } from "react-router-dom";
import { useContext, useState,useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import {userUrl} from '../constants/constant'
import axios from 'axios'
function Home({setblock}) {
	const { userDetails } = useContext(UserContext)
	const user=userDetails
  const [form,setForm]=useState(null);

  useEffect(() => {
   user && axios.get(`${userUrl}/api/users/find/${user._id}`).then(data =>{
    // if(localStorage.getItem("user") == JSON.stringify(data.data) ) return;
    localStorage.setItem("user",JSON.stringify(data.data));
    setblock(data.data.isBlocked)
   })
   })

  useEffect(()=>{
    if(user){
    axios.get(`${userUrl}/api/users/application/${userDetails._id}`).then((response) => {
      if (response.data) {
        console.log(response.data);
        setForm(response.data)
      } else {
        console.log(response)
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  },[])

  
   const navigate=useNavigate()

	return (
		<><NAV/>
		<div className="container">{user.isRegistered?<h1>Application submitted successfully</h1>
		:  <button className="w-60 bg-blue-500 hover:bg-blue-400  font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
		onClick={()=>{navigate('/apply')}}>
      Apply for incubation
      </button>}
      {console.log("form",form)}

      {form ? (form?.isDeclined) ? <p style={{"color":"black"}}>status <div style={{"display":"inline"}} className='text-red-400  '>Declined</div> </p> : (form?.isBooked) ? <p style={{"color":"black"}}>status : <div style={{"display":"inline"}} className='text-green-400  '>Approved</div> </p>: (form?.isApproved) ? <p style={{"color":"black"}}>status : <div style={{"display":"inline"}} className='  '>Under process</div> </p> : <p style={{"color":"black"}}>status : <div style={{"display":"inline"}} className='text-orange-700'> Pending</div> </p> :<></> }

        
          </div>
          </>
        );
}

export default Home;
