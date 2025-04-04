import React from 'react'
import {assets} from "../assets/assets"

const Navbar = ({settoken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <a className='w-[max(10%,80px)]' href="/add">Styles Admin</a> 
        <button onClick={()=>settoken("")} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>


    </div>
  )
}

export default Navbar