import React, { useEffect, useState ,useContext} from 'react'
import { shopcontext } from '../Context/Shopcontext'
import Title from './Title';
import Productitem from './Productitem';

const Relatedproduct = ({category,subcategory}) => {
    const { products } = useContext(shopcontext);
    const [relatedproduct, setrelatedproduct] = useState([]);

    useEffect(() => {
        if (products.length>0) {
             let temp=products.slice();
             temp=temp.filter((item) => item.category === category && item.subCategory === subcategory);
             setrelatedproduct(temp.slice(0,5));
            
        }
    }, [products,category,subcategory])
  return (
    <div className='my-24'>
      
          <div className="text-center text-3xl py-2">
                <Title text1={"RELATED"} text2={"PRODUCTS"}/>
         </div>

         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
                {
                    relatedproduct.map((item,index) => (
                        <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
         </div>




    </div>
  )
}

export default Relatedproduct