import React from 'react'
import { useContext } from 'react';
import { shopcontext } from '../context/shopContext';
import { Link } from 'react-router-dom';

const Productitem = ({id,image,name,price}) => {
    const {currency} = useContext(shopcontext);
  return (
    <Link to={`/product/${id}`} className=' text-gray-700 cursor-pointer'>
    <div className="overflow-hidden ">
        <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out'/>
    </div>

            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
     
    
    </Link>
  )
}

export default Productitem