import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './component/Login'
import { ToastContainer, toast } from 'react-toastify';


export const backendUrl=import.meta.env.VITE_BACKEND_URL;
export const currency="₹"
const App = () => {
  const [token, settoken] = useState(localStorage.getItem("token") ?localStorage.getItem("token") :"")
  useEffect(() => {
    
     localStorage.setItem("token",token)
   
  
  }, [token])
  
  return (
    <div className='bg-gray-50 min-h-screen '>
      <ToastContainer />
      {token === "" ? <Login settoken={settoken} />
        :
        <>
          <Navbar settoken={settoken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
              <Route path='*' element={<Add  token={token} />} />
                <Route path='/add' element={<Add  token={token} />} />
                <Route path='/list' element={<List token={token}  />} />
                <Route path='/order' element={<Order  token={token} />} />
              </Routes>
            </div>
          </div>


        </>


      }


    </div>
  )
}

export default App