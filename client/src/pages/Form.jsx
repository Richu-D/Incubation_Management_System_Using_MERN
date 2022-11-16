
import NAV from "../components/nav";

import React, { useEffect, useState } from 'react'

import Axios from 'axios'
import { userUrl } from '../constants/constant'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Swal from 'sweetalert2'
// import './formInput.css'
import { UserContext } from '../context/UserContext'
import axios from 'axios';

function Form({setblock,user}) {
  useEffect(() => {
   user && axios.get(`${userUrl}/api/users/find/${user._id}`).then(data =>{
    // if(localStorage.getItem("user") == JSON.stringify(data.data) ) return;
    localStorage.setItem("user",JSON.stringify(data.data));
    setblock(data.data.isBlocked)
   })
   })
  

  const { userDetails, setUserDetails } = useContext(UserContext)

  const navigate = useNavigate()

  const [image, setImage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessage1, setErrorMessage1] = useState('')
  const [errorMessage2, setErrorMessage2] = useState('')
  const [errorMessage3, setErrorMessage3] = useState('')
  const [errorMessage4, setErrorMessage4] = useState('')
  const [errorMessage5, setErrorMessage5] = useState('')
  const [errorMessage6, setErrorMessage6] = useState('')
  const [errorMessage7, setErrorMessage7] = useState('')
  const [errorMessage8, setErrorMessage8] = useState('')
 


  const [application, setApplication] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    address: "",
    company_name: "",
    team_and_bg: "",
    company_and_products: "",
    problem: "",
    solution: "",
    value_proposition: "",
    revenue_model: "",
    market_size: "",
    market_plan: "",
    incubation_type: "",
    proposal: "",
  })
  // const handleFocus = (e) => {
  //   setFocused(true);
  // };

  function validateName(){
    if (!application.name) {
      setErrorMessage("Name is required");
      return false;
    } 
    if (application.name.length < 3) {
      setErrorMessage("Name must be atleast 3 characters");
      return false;
    }
    if (!application.name.match(/^[A-Za-z][A-Za-z ]*$/)) {
          setErrorMessage("Enter a valid name");
      return false;
        }
    setErrorMessage(null)
    return true
  }

  function validateAddress(){
    if (!application.address) {
          setErrorMessage5("Address is required");
          return false
        }
    setErrorMessage5(null)
    return true
  }

  function validateCity(){
      if (!application.city) {
          setErrorMessage3("City is required");
          return false
        }
        setErrorMessage3(null); 
        return true
  }

  function validateState(){ 
    if (!application.state) {
          setErrorMessage4("State is required");
        return false
      }
      setErrorMessage4(null); 
      return true
    }

function validateEmail(){
  if (!application.email) {
    setErrorMessage2("Email is required");
    return false;
  } else if (!application.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
    setErrorMessage2("Enter a valid email");
    return false;
  } 
  setErrorMessage2(null); 
  return true;
}

function validatePhone(){
  if (!application.phone) {   
    setErrorMessage1("Phone is required");
    return false;  
  } else if (application.phone.match(/[^0-9]/g)) {
    setErrorMessage1("Enter a valid Phone number");
    return false; 
  } else if (application.phone.length !== 10) {
    setErrorMessage1("Phone must be 10 characters");
    return false; 
  } 
  setErrorMessage1(null);  
  return true;           
}

function validateCompanyName(){
  if (!application.company_name) {
    setErrorMessage6("Company name is required");
    return false;
  }
  setErrorMessage6(null);
  return true;  
}

function validateimage(){
  if (!image) {
    return false;
  }
  setErrorMessage7(null);
  return true;  
}

// function otherFeilds(){
//   if(!application.team_and_bg || !application.company_and_products || !application.problem || !application.solution || !application.value_proposition || !application.revenue_model || !application.market_size || !application.market_plan || !application.incubation_type || !application.proposal){
//     setErrorMessage8("All fields are required");
//     console.log("All fields are required");
//     return false;  
//   }
//   setErrorMessage8(null)
//   console.log("All fields  done");
//   return true;  
// }



  function handleSubmit(e) {
    if(!validateName()||!validateAddress()||!validateCity()||!validateState()|| !validateEmail()||!validatePhone()||!validateCompanyName()||!validateimage()||!application.team_and_bg || !application.company_and_products || !application.problem || !application.solution || !application.value_proposition || !application.revenue_model || !application.market_size || !application.market_plan || !application.incubation_type || !application.proposal){
      e.preventDefault()
      console.log("No submit");
    }else{
      e.preventDefault()
      Axios.post(`${userUrl}/api/users/upload/${userDetails._id}`, { ...application} ).then((response) => {
              localStorage.setItem('user', JSON.stringify(response.data))
              setUserDetails(response.data)
              console.log(response.data + "this is response after update");
              navigate('/')
            }).catch((err) => {
              Swal.fire({
                title: 'Error!',
                text: 'please recheck credentials',
                icon: 'error',
                confirmButtonText: 'ok'
              })
            })
          }
    }


   
  

  function handleChange(e) {
    setApplication({ ...application, [e.target.name]: e.target.value })
  }


  return (
    <div className="bg-gray-200 h">
      <NAV />
      <div className="container flex justify-center mx-auto ">
        <div className=" lg:h-1/2 w-10/12 lg:w-2/3 mt-14 p-3">
          <div>
            <h1 className="text-center text-3xl" style={{"paddingBottom":"10px"}}>Register Form</h1>
          </div>
          <div>
            <form style={{"paddingTop":"10px"}}>
              <div className="flex space-x-2">
                <div className="mb-6 w-1/2">
                  <label
                     htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Name*
                  </label>
                  <input
                    type="text"
                    name='name' onBlur={()=>{validateName()}} onChange={(e) =>{
                      handleChange(e)
                      
                    } }
                    id="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder=""
                    required=""
                    
                  />
                    {errorMessage && <div className="p-4 mb-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}


                </div>
                <div className="mb-6  w-1/2">
                  <label
                     htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Address*

                  </label>
                  <input

                    name='address' onBlur={()=>{validateAddress()}} onChange={(e) => {
                      validateAddress()
                      handleChange(e)}}
                    type="text"
                    id="address"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                {errorMessage5 && <div className="p-4 mb-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage5}</div>}

                </div>

              </div>


              <div className="flex space-x-2">
                <div className="mb-6 w-1/2">
                  <label
                     htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    City*
                  </label>
                  <input
                    name='city' onBlur={()=>{validateCity()}} onChange={(e) => handleChange(e)}
                    type="text"

                    id="city"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder=""
                    required=""
                  />
                    {errorMessage3 && <div className="p-4 mb-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage3}</div>}

                </div>
                <div className="mb-6  w-1/2">
                  <label
                     htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    State*
                  </label>
                  <input
                    name='state' onBlur={()=>{validateState()}} onChange={(e) => handleChange(e)}
                    type="text"

                    id="state"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required=""
                  />
                    {errorMessage4 && <div className="p-4 mb-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage4}</div>}

                </div>
              </div>

              <div className="flex space-x-2">
                <div className="mb-6 w-1/2">
                  <label
                     htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email*
                  </label>
                  <input

                    type="email"
                    name='email' onBlur={()=>{validateEmail()}} onChange={(e) => handleChange(e)}
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder=""
                    required=""
                  />
                    {errorMessage2 && <div className="p-4 mb-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage2}</div>}

                </div>
                <div className="mb-6  w-1/2">
                  <label
                     htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Phone*
                  </label>
                  <input
                    type="number"
                    name='phone' onBlur={()=>{validatePhone()}} onChange={(e) => handleChange(e)}
                    id="phone"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required=""
                  />
                {errorMessage1 && <div className="p-4 mb-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage1}</div>}

                </div>

              </div>

              <div className="flex space-x-2">
                <div className="mb-6 w-1/2">
                  <label
                     htmlFor="company"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Company Name*
                  </label>
                  <input
                    type="text"
                    name='company_name' onBlur={()=>{validateCompanyName()}} onChange={(e) => handleChange(e)}
                    id="company"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder=""
                    required=""
                  />
                {errorMessage6 && <div className="p-4 mb-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage6}</div>}

                </div>
                <div className="mb-6  w-1/2">
                  <label
                     htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Image*
                  </label>
                  <img width="100px" height="100px" style={{display: `${image?"block":"none"}`}} src={image ? URL.createObjectURL(image) : ''} alt="logo" className='mr-2' />
                  <input
                    type="file"
                    id="image"
                    onChange={(e)=>{validateimage();setImage(e.target.files[0])}}
                    
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required=""
                  />
                {errorMessage7 && <div className="p-4 mb-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage7}</div>}

                </div>
              </div>
              <div className="flex flex-col ">
                <div className="mb-6">
                  <label  htmlFor="background" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Describe the Team and Background*</label>
                  <textarea id="background" rows="4" name='team_and_bg' onChange={(e) => handleChange(e)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <div className="mb-6">
                  <label  htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Describe your company and Products*</label>
                  <textarea id="product" rows="4" name='company_and_products' onChange={(e) => handleChange(e)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <div className="mb-6">
                  <label  htmlFor="problem" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Describe the problem you are trying to solve*</label>
                  <textarea id="problem" name='problem' onChange={(e) => handleChange(e)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <div className="mb-6">
                  <label  htmlFor="solution" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What is unique about your solution?*</label>
                  <textarea id="solution" rows="4" name='solution' onChange={(e) => handleChange(e)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <div className="mb-6">
                  <label  htmlFor="proposition" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What is your value proposition  htmlFor the customer?*</label>
                  <textarea id="proposition" name='value_proposition' onChange={(e) => handleChange(e)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <div className="mb-6">
                  <label  htmlFor="competitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Who are your competitors and what is your competative advantage ?*</label>
                  <textarea id="competitors" rows="4" name='competitive_advantage' onChange={(e) => handleChange(e)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <div className="mb-6">
                  <label  htmlFor="revenue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">what is your revenue model ?*</label>
                  <textarea id="revenue" rows="4" name='revenue_model' onChange={(e) => handleChange(e)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <div className="mb-6">
                  <label  htmlFor="marketsize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">what is the potential market size of the product ?*</label>
                  <textarea id="marketsize" rows="4" name='market_size' onChange={(e) => handleChange(e)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <div className="mb-6">
                  <label  htmlFor="marketing" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">How do you market or plan to market your products and services*</label>
                  <textarea id="marketing" rows="4" name='market_plan' onChange={(e) => handleChange(e)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Types of Incubation needed</label>
                  <div className="flex items-center pl-4 rounded  dark:border-gray-700">
                    <input id="bordered-radio-1" type="radio" value="physical" name="incubation_type" onChange={(e) => {
                      if (e.target.checked) { setApplication({ ...application, [e.target.name]: e.target.value }) }
                    }} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:bg-gray-200 dark:border-gray-600" />
                    <label  htmlFor="bordered-radio-1" className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Physical Incubation</label>
                  </div>
                  <div  className="flex items-center pl-4 rounded dark:border-gray-700">
                    <input checked="" id="bordered-radio-2" type="radio" value="virtual" onChange={(e) => {
                      if (e.target.checked) { setApplication({ ...application, [e.target.name]: e.target.value }) }
                    }} name="incubation_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:bg-gray-200 dark:border-gray-600" />
                    <label  htmlFor="bordered-radio-2" className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Virtual Incubation</label>
                  </div>
                </div>

                <div className="mb-6">
                  <label  htmlFor="proposal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload a detailed buissness proposal*</label>
                  <textarea id="proposal" rows="4" name='proposal' onChange={(e) => handleChange(e)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
              </div>
              {errorMessage8 && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage8}</div>}

              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-9  "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;



