import { createContext } from "react";
import axios, { Axios } from "axios"
import { useState ,useEffect} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const shopcontext= createContext();
const ShopcontextProvider = (props) => {
       const currency='₹';
       const delivery_fee=50;
       const backendurl= import.meta.env.VITE_BACKEND_URL;
       
        const [search, setsearch] = useState('');
        const [showsearchbar, setshowsearchbar] = useState(false)
        const [cartitem, setcartitem] = useState({});
        const [products, setproducta] = useState([]);
        const [token, settoken] = useState("");
        const navigate= useNavigate();

        const addtocart = async(itemid,size)=>{
            if(!size){
                toast.error("select product size");
                return;
            }

           let cartdata=structuredClone(cartitem);

            if(cartdata[itemid]){
                if(cartdata[itemid][size]){
                    cartdata[itemid][size]+=1;
                }
                else{

                    cartdata[itemid][size]=1;
                }
            }else{
                cartdata[itemid]={};
                cartdata[itemid][size]=1;


            }
               setcartitem(cartdata);


             if(token){
                try {
                    await axios.post(backendurl+"/api/cart/add",{itemid,size},{headers:{token}})
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
             }


        }
        

        const getcartcount =()=>{
            let totalcount=0;
            // for in loop
            for(const items in cartitem){
                for(const item in cartitem[items]){
                   try {
                     if(cartitem[items][item] >0){
                        totalcount+=cartitem[items][item];
                     }
                   } catch (error) {
                    
                   }
                }
            }
            return totalcount;
        }

      const updatequantity=async(itemid,size,quantity)=>{
          let cartdata= structuredClone(cartitem)
          cartdata[itemid][size]=quantity;
          setcartitem(cartdata);


             if(token){
                try {
                    await axios.post(backendurl+"/api/cart/update",{itemid,size,quantity},{headers:{token}})

                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
             }

      }

      const getcartamount=()=>{
        let totalamount=0;
        for(const items in cartitem){
            let iteminfo=products.find((prdt)=>prdt._id===items)
            for(const item in cartitem[items]){
                try {
                    if(cartitem[items][item]>0){
                      totalamount+= iteminfo.price*cartitem[items][item] 
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalamount;
      }

    //   function for cll all product from backend

    const getProductdata =async()=>{
        try {
            const responds =await axios.get(backendurl+"/api/product/list")
             if(responds.data.success){
                setproducta(responds.data.products)
             }
             else{
                toast.error(responds.data.message)
             }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }
     const getUsercart=async(token)=>{

        try {
            const response = await axios.post(backendurl+"/api/cart/get",{},{headers:{token}})
             if(response.data.success){
                setcartitem(response.data.cartData)
             }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

     }




    useEffect(() => {
      getProductdata();
    }, [])

    useEffect(() => {
       if(!token && localStorage.getItem("token")){
         settoken(localStorage.getItem("token"))
         getUsercart(localStorage.getItem("token"))
       }
    }, [])
    
    
      
        
      const value={
           products,currency,delivery_fee,search,showsearchbar,setsearch,setshowsearchbar,cartitem,addtocart,getcartcount,updatequantity,getcartamount,navigate,backendurl,token,settoken,setcartitem
      }

    return (
        <shopcontext.Provider value={value}>
            {props.children}
        </shopcontext.Provider>
    )
}
export default ShopcontextProvider;