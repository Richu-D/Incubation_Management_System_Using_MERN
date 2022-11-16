import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Home from './pages/Home';
import Form from './pages/Form';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import axios from 'axios';
import { userUrl } from './constants/constant';
import BlockPage from './pages/BlockPage';



function App() {
  const {userDetails} = useContext(UserContext)
  const user = userDetails
  const [block,setblock] = useState(false)

  // useEffect(() => {
  //   user && axios.get(`${userUrl}/api/users/find/${user._id}`).then(data =>{
  //    // if(localStorage.getItem("user") == JSON.stringify(data.data) ) return;
  //    localStorage.setItem("user",JSON.stringify(data.data));
  //    setblock(data.data.isBlocked)
  //   })
  //   })

  return (
    <div className="App">
    {
      (block) ? (<BlockPage setblock={setblock} user={user} />):(<Router>
        <Routes>
           <Route exact path="/" element={user ? <Home setblock={setblock} />: <Login/> }/>
           <Route path="/login" element={user ? <Home setblock={setblock} />: <Login/> }  /> 
           <Route path="/signup" element={user ? <Home setblock={setblock} />: <Signup/> }  />
         {user&& <>
           <Route path="/apply" element={<Form setblock={setblock} user={user}/> }  />
         </>
         }
           </Routes>
 
         </Router>)


    }  

       

    </div>
  )
}

export default App;
