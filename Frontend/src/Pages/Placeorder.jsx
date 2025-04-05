import React, { useState, useEffect, useContext } from 'react'
import Title from '../Components/Title'
import Carttotal from '../Components/Carttotal'
import { assets } from '../assets/assets'
import { shopcontext } from '../Context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {
    const { navigate, backendurl, token, cartitem, setcartitem, getcartamount, delivery_fee, products } = useContext(shopcontext);
    const [method, setmethod] = useState("cod")
    const [formData, setformData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setformData(data => ({ ...data, [name]: value }))
    }

    const onSubmithandler = async (event) => {
        event.preventDefault()
        try {
            let orderitems = [];
            for (const items in cartitem) {
                for (const item in cartitem[items]) {
                    if (cartitem[items][item] > 0) {
                        const iteminfo = structuredClone(products.find(product => product._id === items))
                        if (iteminfo) {
                            iteminfo.size = item;
                            iteminfo.quantity = cartitem[items][item];

                            orderitems.push(iteminfo)
                        }
                    }
                }
            }
            let orderData = {
                address: formData,
                items: orderitems,
                amount: getcartamount() + delivery_fee
            }
            switch (method) {
                case "cod":
                       const response =await axios.post(backendurl+'/api/order/place',orderData,{headers:{token}})
                       if(response.data.success){
                         setcartitem({})
                         navigate("/order")
                       }else{
                        toast.error(response.data.message)
                       }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }


    }

    return (
        <form onSubmit={onSubmithandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
            {/* ----------------left side---------------- */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name='firstname' value={formData.firstname} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='FIRST NAME' />
                    <input required onChange={onChangeHandler} name='lastname' value={formData.lastname} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='LAST NAME' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='street' />
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='State' />
                </div>
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder='phone' />
            </div>

            {/* Right side */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <Carttotal />
                </div>
                <div className="mt-12">
                    <Title text1={"PAYMENT"} text2={"METHOD"} />
                    {/* payment method selection */}
                    <div className="flex gap-3 flex-col lg:flex-row ">
                        <div onClick={() => setmethod("stripe")} className="flex items-center bap-3 border p-2 px-3 cursor-pointer ">
                            <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === "stripe" ? "bg-green-400" : ""} `} ></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setmethod("razorpay")} className="flex items-center bap-3 border p-2 px-3 cursor-pointer ">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""} `} ></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setmethod("cod")} className="flex items-center bap-3 border p-2 px-3 cursor-pointer ">
                            <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === "cod" ? "bg-green-400" : ""}`} ></p>
                            <p className='text-gray-500 text-sm  font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                    <div className="w-full text-end mt-8">

                        <button type='submit' className='bg-black text-white text-sm my-3  py-2 px-5 '>PLACE ORDER</button>

                    </div>
                </div>
            </div>
        </form>
    )
}

export default Placeorder