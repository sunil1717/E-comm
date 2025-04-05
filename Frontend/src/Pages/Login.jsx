import React, { useContext, useEffect, useState } from 'react'
import { shopcontext } from '../Context/shopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {
  const [currentstate, setcurrentstate] = useState("login")
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const { settoken, token, navigate, backendurl } = useContext(shopcontext);

  const onsubmithandler = async (event) => {
    event.preventDefault();
    try {
      if(currentstate==="signup"){
        const respones =await axios.post(backendurl+"/api/user/register",{name,email,password})
        if(respones.data.success){
          settoken(respones.data.token)
          localStorage.setItem("token",respones.data.token)
        }else{
          toast.error(respones.data.message)
        }
      }else{

        const respones =await axios.post(backendurl+"/api/user/login",{email,password});
        if(respones.data.success){
          settoken(respones.data.token)
          localStorage.setItem("token",respones.data.token)
        }else{
          toast.error(respones.data.message)
        }

      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }

  }

  useEffect(() => {
    if(token){
      navigate("/")
    }
  }, [token])
  


  return (
    <form onSubmit={onsubmithandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentstate}</p>

      </div>

      {currentstate === "login" ? "" :
        <input onChange={(e)=>setname(e.target.value)} value={name} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder=' NAME' required />}
      <input onChange={(e)=>setemail(e.target.value)} value={email}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder='Email address' required />
      <input onChange={(e)=>setpassword(e.target.value)} value={password}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="password" placeholder='password' required />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot your password ?</p>
        {
          currentstate === "login"
            ? <p className='cursor-pointer' onClick={() => setcurrentstate("signup")}>creat account</p>
            : <p className='cursor-pointer' onClick={() => setcurrentstate("login")}>Login here</p>

        }
      </div>
      <button className="bg-black text-white text-sm my-8  py-2 px-6 ">{currentstate === "login" ? "Sign in" : "Sign up"}</button>
    </form>
  )
}

export default Login