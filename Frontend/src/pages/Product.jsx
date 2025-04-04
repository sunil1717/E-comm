import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { shopcontext } from '../context/Shopcontext'
import { useState,useEffect } from 'react'
import { assets } from '../assets/assets'
import Relatedproduct from '../Components/Relatedproduct'

const Product = () => {

  const { productid } = useParams();
  const { products,currency,addtocart } = useContext(shopcontext);
  const [productdata, setproductdata] = useState(false);
  const [img, setimg] = useState("")
  const [size, setsize] = useState("");


    const getproduct = async() => {
        const product = products.find((product) => product._id === productid)
        setproductdata(product)
        setimg(product.image[0])
        
     
    }
    useEffect(() => {
        getproduct()
    }, [productid, products])

  return productdata ?  (
    <div className='border-t-2 transition-opacity ease-in duration-500 opacity-100'>
       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
             {/* product image here */}
           <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row  ">
                <div className="flex sm:flex-col overflow-y-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                  {
                    productdata.image.map((item, index) => (
                      <img onClick={()=>setimg(item)} key={index} src={item} alt="" className="cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0 " />
                    ))
              }
                </div>
                <div className="w-full sm:w-[80%]">
                  <img src={img} alt=""
                  className="w-full h-auto "/>
                </div>

                

           </div>
            {/* product details here */}
             <div className="flex-1 ">
              <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
                 <div className="flex items-center gap-1 mt-2">
                  <img src={assets.star_icon} alt="" className="w-3.5" />
                  <img src={assets.star_icon} alt="" className="w-3.5" />
                  <img src={assets.star_icon} alt="" className="w-3.5" />
                  <img src={assets.star_icon} alt="" className="w-3.5" />
                  <img src={assets.star_dull_icon} alt="" className="w-3.5" />
                  <p className='pl-2'>(122)</p>
                 </div>
                  <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
                  <p className='mt-5  text-gray-500 w-4/5'>{productdata.description}</p>
                  <div className="flex flex-col gap-4 my-8">
                    <p>Select size</p>
                    <div className="flex gap-2">
                       {productdata.sizes.map((item, index) => (
                          <button onClick={()=>setsize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item===size ?"border-gray-950" :""}`}>{item}</button>
                       ))}
                    </div>
                  </div>
                  <button onClick={()=>addtocart(productdata._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
                   <hr className='mt-8 sm:w-4/5 ' />
                   <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                      <p>100% Original product</p>
                      <p>Cash on Devivery Available</p>
                      <p>7 Day return Policy</p>
                   </div>
           
             </div>

       </div>
          {/* description and review here */}
           <div className="mt-20">
              <div className="flex ">
                 <b className='border px-5 py-3 text-sm'>Description</b>
                 <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
              </div>
              <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 ">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, est?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, in?</p>
              </div>
           </div>
           {/* related products here */}
           <Relatedproduct category={productdata.category} subcategory={productdata.subCategory} />

    </div>
   
  ) : <div className='opacity-0'>Product not found</div>
}

export default Product