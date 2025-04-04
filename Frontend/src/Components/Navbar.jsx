import React, { useState ,useContext} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {assets} from '../assets/assets'
import { shopcontext } from '../context/shopContext'



const Navbar = () => {



    const { setshowsearchbar,getcartcount,navigate,token,settoken,setcartitem} = useContext(shopcontext);
    const [visible, setvisible] = useState(false)


    const Logout=()=>{
      navigate("/login")
       localStorage.removeItem("token");
       settoken("");
       setcartitem({});
     
    }
  return (

    // Navbar
    <div className="flex justify-between items-center py-4 font-medium">
        {/* name of the brand */}
        <a className="navbar-brand italic font-semibold" href="/">Styles</a>
        
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700 ">
            <NavLink className="flex flex-col items-center gap-1" to="/">
              <p>HOME</p>
              <hr className="w-2/4  border-none h-[1.5px] bg-gray-700 hidden "/>
             </NavLink>
             <NavLink className="flex flex-col items-center gap-1" to="/about">
              <p>ABOUT</p>
              <hr className="w-2/4  border-none h-[1.5px] bg-gray-700 hidden"/>
             </NavLink>
             <NavLink className="flex flex-col items-center gap-1" to="/collection">
              <p>COLLECTION</p>
              <hr className="w-2/4  border-none h-[1.5px] bg-gray-700 hidden"/>
             </NavLink>
             <NavLink className="flex flex-col items-center gap-1" to="/contact">
              <p>CONTACT</p>
              <hr className="w-2/4  border-none h-[1.5px] bg-gray-700 hidden"/>
             </NavLink>
        </ul>
         {/* searchbar */}
        <div className="flex items-center gap-6">
              <img onClick={()=> setshowsearchbar(true)} src={assets.search_icon} alt="" className="w-5 cursor-pointer"/>
                 <div className="group relative">

                 
                    <img onClick={()=> token ? null : navigate("/login")} src={assets.profile_icon} alt="" className="w-5 cursor-pointer"/> 
                     {/* Dropdown */}
                   {
                     token &&
                       <div className="absolute  right-0 pt-4  hidden group-hover:block dropdown-menu ">
                     <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                          <p className='cursor-pointer hover:text-black'>my profile</p>
                          <p onClick={()=>navigate("/order")} className='cursor-pointer hover:text-black'>Order</p>
                          <p onClick={Logout} className='cursor-pointer hover:text-black'>Logout</p>
                     </div>
                 </div>
                   }
                 </div>
                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} alt="" className="w-5 min-w-5"/>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center">{getcartcount()}</span>
                 </Link>
                 <img onClick={()=>setvisible(true)}src={assets.menu_icon} alt="" className="w-5 cursor-pointer sm:hidden"/>
        </div>

         {/* side bar menu for small screen  */}
               <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full":"w-0"}`}>
                  <div className="flex flex-col text-gray-600 ">
                        <div onClick={()=>setvisible(false)} className="flex item-center gap-4 p-3 cursor-pointer">
                            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180"/>
                            <p >Back</p>
                        </div>
                          <NavLink  onClick={()=>setvisible(false)} to="/" className=" py--2 pl-6 border ">HOME</NavLink>
                          <NavLink  onClick={()=>setvisible(false)} to="/about" className=" py--2 pl-6 border ">ABOUT</NavLink>
                          <NavLink  onClick={()=>setvisible(false)} to="/collection" className=" py--2 pl-6 border ">COLLECTION</NavLink>
                          <NavLink  onClick={()=>setvisible(false)} to="/contact" className=" py--2 pl-6 border ">CONTACT</NavLink>
                  
                  </div>  
               </div>
        
        
    </div>
  )
}

export default Navbar