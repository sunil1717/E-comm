import React from 'react'
import { useContext,useEffect ,useState} from 'react'
import { shopcontext } from '../context/shopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'





const Searchbar = () => {
  const { search,setsearch ,showsearchbar,setshowsearchbar} = useContext(shopcontext);
  const [visible, setvisible] = useState(false)
  const location =useLocation();
  useEffect(() => {
    if(location.pathname.includes('collection')){
      setvisible(true)
    }
    else{
      setvisible(false)
    }
    
  }, [location])



  return showsearchbar&& visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
            <div className="inline-flex items-center justify center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
             <input value={search} onChange={(e)=>setsearch(e.target.value)} type="text" className='flex-1 outline-none bg-inherit text-sm'  placeholder='search'/>

            <img className='w-4' src={assets.search_icon} alt="" />

            </div>
        <img onClick={()=>setshowsearchbar(false)} className=" inline w-3 cursor-pointer"  src={assets.cross_icon} alt="" />



    </div>
  ) : null
}

export default Searchbar