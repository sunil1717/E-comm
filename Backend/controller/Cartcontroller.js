
//add product to user cart-------------

import userModel from "../models/Usermodel.js";

const addToCart = async (req, res) => {
    try {
        const { userid, itemid, size } = req.body;
        const userdata =await userModel.findById(userid);
        let cartData =await userdata.cartData;

        if(cartData [itemid]){
            if(cartData[itemid][size]){
                cartData[itemid][size]+=1;
            }else{
                cartData [itemid][size]=1;
            }
        }else{
            cartData[itemid]={}
            cartData[itemid][size]=1
        }
        await userModel.findByIdAndUpdate(userid,{cartData})
        res.json({success:true,message:"added to cart"})

    } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
    }
}

//update cart-----------------

const updateCart = async (req, res) => {

    try {
        const { userid,itemid,size,quantity}=req.body;
        const userdata =await userModel.findById(userid);
        let cartData =await userdata.cartData;

        cartData[itemid][size]=quantity;
        await userModel.findByIdAndUpdate(userid,{cartData})
        res.json({success:true,message:"cart updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

//get user cart -----------------

const getUserCart = async (req, res) => {
   
    try {
        const {userid}=req.body;
        const userdata =await userModel.findById(userid);
        let cartData =await userdata.cartData;
        res.json({success:true ,cartData})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
export { addToCart, updateCart, getUserCart }