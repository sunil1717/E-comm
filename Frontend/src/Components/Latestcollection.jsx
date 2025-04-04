import React from 'react'
import { useContext,useState,useEffect } from 'react';
import { shopcontext } from '../Context/shopContext';
import Title from './Title';
import Productitem from './Productitem';
const Latestcollection = () => {

     const{ products} =useContext(shopcontext);
     const [latestproduct, setlatestproduct] = useState([]);
     useEffect(() => {
         setlatestproduct(products.slice(0,10));
     }, [products])

  return (
    <div className='my-10'>
       <div className="text-center py-8 text-3xl">
         <Title text1={'LATEST'} text2={"COLLECTION"}/>
         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam laborum necessitatibus oimus ex commodi? Expedita, rerum?</p>
       </div>
        {/* procuct items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
            {latestproduct.map((item,index)=>(
                <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))}
        </div>
    
    </div>
  )
}

export default Latestcollection