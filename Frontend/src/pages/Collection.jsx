import React, { useContext, useState } from 'react'
import { shopcontext } from '../Context/shopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import { useEffect } from 'react'
import Productitem from '../Components/Productitem'





const Collection = () => {

  const{ products,search ,showsearchbar} =useContext(shopcontext);
  const [showfilter, setshowfilter] = useState(false)
  const [filterproduct, setfilterproduct] = useState([])
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [sorttype, setsorttype] = useState("relavent")



   const toggleCategory = (e) => {
    if(category.includes(e.target.value.toLowerCase())){
      setcategory(prev=>prev.filter((item)=>item !== e.target.value.toLowerCase()))
    }else{
      setcategory(prev=>[...prev,e.target.value.toLowerCase()])
    }}

  const toggleSubCategory = (e) => {
    if(subcategory.includes(e.target.value.toLowerCase())){
      setsubcategory(prev=>prev.filter((item)=>item !== e.target.value.toLowerCase()))  
    }else{
      setsubcategory(prev=>[...prev,e.target.value.toLowerCase()])
    }
  }

const sortprice = (e) => {

   let fpcopy = filterproduct.slice();
      switch(sorttype){
        case "low-high":
          setfilterproduct(fpcopy.sort((a,b)=>a.price-b.price))
          
          break;
        case "high-low":
          setfilterproduct(fpcopy.sort((a,b)=>b.price-a.price))
          break;
        default:applyFilter();
          break;
      }
 
  }



 const applyFilter = () => {
    let temp = products.slice();
    if(showsearchbar && search.length>0){
      temp = temp.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      temp = temp.filter((item)=>category.includes(item.category.toLowerCase()))
    }
    if(subcategory.length>0){
      temp = temp.filter((item)=>subcategory.includes(item.subCategory.toLowerCase()))
    }
    setfilterproduct(temp)  
  }
  useEffect(() => { 
    applyFilter();
  }, [category,subcategory,search,showsearchbar,products])
    
  useEffect(() => { 
    sortprice();
  }, [sorttype])

      
  return (
   <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
     {/* filter */}
     <div className="min-w-60">
      <p  onClick={()=>setshowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filter
      <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showfilter ?"rotate-90":""}`} alt="" />
      </p>
      
      {/* category */}
         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter? "":"hidden"} sm:block`}>
            <p className='text-sm mb-3 font-mediuym'>Category</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
               <p className='text-sm cursor-pointer'>
                  <input type="checkbox" className='w-3' value={"Men"} onChange={toggleCategory} />Men
               </p>
               <p className='text-sm cursor-pointer'>
                  <input type="checkbox" className='w-3' value={"Women"}onChange={toggleCategory} />Women
               </p>
               <p className='text-sm cursor-pointer'>
                  <input type="checkbox" className='w-3' value={"Kids"}onChange={toggleCategory} />Kids
               </p>
              
             
            </div>
         </div>
          {/* sub category */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter? "":"hidden"} sm:block`}>
            <p className='text-sm mb-3 font-mediuym'>type</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
               <p className='text-sm cursor-pointer'>
                  <input type="checkbox" className='w-3' value={"Topwear"} onChange={toggleSubCategory}/>Topwear
               </p>
               <p className='text-sm cursor-pointer'>
                  <input type="checkbox" className='w-3' value={"Bottomwear"}onChange={toggleSubCategory}/>Bottomwear
               </p>
               <p className='text-sm cursor-pointer'>
                  <input type="checkbox" className='w-3' value={"Winterwear"}onChange={toggleSubCategory}/>Winterwear 
               </p>
              
             
            </div>
         </div>

     </div>
      {/* rightside */}
      <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
                  <Title text1={"ALL"} text2={"COLLECTIONS"}/>
                  {/* product sort */}
                  <select  onChange={(e)=>setsorttype(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                       <option value="relavent">sort by:relavent</option>
                       <option value="low-high">sort by:low-high</option>
                       <option value="high-low">sort by:high-low</option>



                  </select>
           </div>
            {/* product */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {
                filterproduct.map((item,index)=>(
                <Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
                ))
              }
            </div>

      </div>
       


   </div>
  )
}

export default Collection