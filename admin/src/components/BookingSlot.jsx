import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Axios from 'axios';
// import NavAdmin from './NavAdmin';
import { userUrl } from "../constants/constant";



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '17rem',
    height: '12rem',
    backgroundColor: 'hwb(235deg 87% 1%)',
    border: 'none'
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
};
const Slots = ({ values, setModal, setIndex, forms }) => {
    const [val, setVal] = useState(values)
    let slotArr = []
    forms.filter(element => {
      if (element.isBooked) {
        slotArr.push(element.slotId)
      }
    });
    return (
      <>
        {val.map((slotObj, index) => {
          if (slotObj.isBooked || slotArr.includes(slotObj.slot)) return <div key={slotObj.slot} className='w-16 h-16 bg-gray-500'></div>;
          else return <div key={slotObj.slot} onClick={(e) => {
            setModal(true)
            setIndex({ val: val, index: index })
          }} className='w-16 h-16 bg-green-500 hover:bg-green-900'></div>;
        })}
      </>
    );
  }
function BookingSlot() {
  const [status, setStatus] = useState('')

  Modal.setAppElement('#root')
  const [modal, setModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [forms, setForms] = useState([])
  const [selected, setselected] = useState('')
  const [indexof, setIndex] = useState({})

  const A = [], B = [], C = [], D = [], E = [], F = []
  for(let i = 1; i <= 10; i++) {
    A.push({ name: 'A', slot: 'A' + i, isBooked: false })
    B.push({ name: 'B', slot: 'B' + i, isBooked: false })
    C.push({ name: 'C', slot: 'C' + i, isBooked: false })
    D.push({ name: 'D', slot: 'D' + i, isBooked: false })
    E.push({ name: 'E', slot: 'E' + i, isBooked: false })
    F.push({ name: 'F', slot: 'F' + i, isBooked: false })
  }

  const [slotA, setSlotA] = useState(A)
  const [slotB, setSlotB] = useState(B)
  const [slotC, setSlotC] = useState(C)
  const [slotD, setSlotD] = useState(D)
  const [slotE, setSlotE] = useState(E)
  const [slotF, setSlotF] = useState(F)

  useEffect(() => {
    Axios.get(`${userUrl}/api/admin/slots`).then((response) => {
      if (response.data) {
        console.log(response);
        setSlotA(response.data.A)
        setSlotB(response.data.B)
        setSlotC(response.data.C)
        setSlotD(response.data.D)
        setSlotE(response.data.E)
        setSlotF(response.data.F)
      }
      Axios.get(`${userUrl}/api/admin/approved`).then((response) => {
        console.log(response.data);
        if (response.data) {
          setForms(response.data.data)
        } else {
          setErrorMessage('Something went wrong 1')
        }
      }).catch((err) => {
        console.log(err);
        setErrorMessage('Something went wrong 2')
      })
    }).catch((err) => {
      console.log(err);
      setErrorMessage('Something went wrong 3')
    })
    
  }, [status])



  function handleCompany() {
    if (selected == 0) {
      setModal(false)
      setErrorMessage('company is not selected')
    } else {
      Axios.post(`${userUrl}/api/admin/booking/${selected}`, indexof).then((response) => {
        if (response.data) {
          setStatus(new Date())
          console.log(indexof,'sd');
          let { val, index } = indexof
          val[index].isBooked = true
          setModal(false)
        } else {
          setErrorMessage('Something went wrong 4')
        }
        setselected(0)
      }).catch((err) => {
        console.log(err);
        setErrorMessage('Something went wrong 5')
      })
    }
  }

  return (
    <>
   
      <Modal isOpen={modal} onRequestClose={() => { setModal(false) }} style={customStyles}>
        <p className='text-end'><i onClick={() => { setModal(false) }} className="fa-solid fa-x  "></i></p>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Select a company</label>
        <select id="countries" name='company' onChange={ (e) => { if (e.target.value !== 0) { setselected(e.target.value) } else { setModal(false) } }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option defaultValue value={0} >Choose a company</option>
          {forms.map((item) => {
            if (item.isBooked == false) { return <option key={item._id} value={item._id}>{item.company_name}</option> }
          })}
        </select>
        <button onClick={(handleCompany)} style={{width:"100%"}} className='bg-green-600 mt-5  border border-gray-300 text-white w-100 mx-auto px-3 py-2 rounded  hover:bg-green-900' >Submit</button>
        {/* className='bg-blue-900 border border-gray-300 text-white px-2 py-1 rounded m-1' */}
      </Modal>
     
      <div className= ''>
      <div className=' '>
        <h1 className='text-3xl text-blue-600 font-bold'>Booking <span className='text-blue'>slots</span></h1>
        <h3 className='text-xl text-center'>select the below slots to register the company</h3>
        {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}
      </div>
      <div className='h-full'>
        <div className='flex  flex-col justify-center items-center m-5'>
          <div className="flex flex-wrap flex-row justify-center items-center gap-4 border-b-2 border-500 pb-5">
            <Slots values={slotA} setModal={setModal} setIndex={setIndex} forms={forms} />
          </div>

          <div className='flex flex-row flex-wrap justify-center items-center'>
            <div className="grid grid-cols-2 gap-4 mt-5 px-3 border-r-2 border-500">
              <Slots values={slotB} setModal={setModal} setIndex={setIndex} forms={forms} />
            </div>

            <div className="grid grid-cols-2 gap-4  mt-5 px-3 border-r-2 border-500">
              <Slots values={slotC} setModal={setModal} setIndex={setIndex} forms={forms} />
            </div>

            <div className="grid grid-cols-2 gap-4  mt-5 px-3 border-r-2 border-500">
              <Slots values={slotD} setModal={setModal} setIndex={setIndex} forms={forms} />
            </div>

            <div className="grid grid-cols-2 gap-4  mt-5 px-3 border-r-2 border-500">
              <Slots values={slotE} setModal={setModal} setIndex={setIndex} forms={forms} />
            </div>

            <div className="grid grid-cols-2 gap-4  mt-5 px-3 border-r-2 border-500">
              <Slots values={slotF} setModal={setModal} setIndex={setIndex} forms={forms} />
            </div>

          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default BookingSlot




