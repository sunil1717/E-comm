import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
  return (
   <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
       <div >
         <img src={assets.exchange_icon} className='w-12 m-auto mb-5'  alt="" />
         <p className='font-semibold'>Easy Exchange policy</p>
         <p className='text-gray-400'>We offer hassle free exchange policy</p>
       </div>
       <div >
         <img src={assets.quality_icon} className='w-12 m-auto mb-5'  alt="" />
         <p className='font-semibold'>7 Days return policy</p>
         <p className='text-gray-400'>We provide 7 day free return policy</p>
       </div>
       <div >
         <img src={assets.support_img} className='w-12 m-auto mb-5'  alt="" />
         <p className='font-semibold'>Best Costumer Support</p>
         <p className='text-gray-400'>We provide 24hr costumer support</p>
       </div>
   </div>
  )
}

export default Ourpolicy