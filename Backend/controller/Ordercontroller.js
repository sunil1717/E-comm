


import ordermodel from "../models/Ordermodel.js"
import usermodel from "../models/Usermodel.js"
//place in order using COD 

const placeOrder = async (req, res) => {
  try {
    const { userid, items, amount, address } = req.body;
    const orderData = {
      userid,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    }
    const newOrder = new ordermodel(orderData);
    await newOrder.save();
    await usermodel.findByIdAndUpdate(userid, { cartData: {} })
    res.json({ success: true, message: "order placed" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }


}


//place in order using stripe

const placeOrderStripe = async (req, res) => {



}

//place in order using razorpay

const placeOrderRazorpay = async (req, res) => {



}

//all orders data for admin pannel 


const allOrders = async (req, res) => {
   try {
      const orders= await ordermodel.find({});
      res.json({success:true,orders})

   } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
   }

}

// user order data for frontend


const userOrders = async (req, res) => {
  try {

    const { userid } = req.body;
    const orders =await ordermodel.find({userid})
    res.json({success:true,orders})
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}
//update order status from admin pannel
const updateStatus = async (req, res) => {
    try {
      const { orderid, status } = req.body;
      await ordermodel.findByIdAndUpdate(orderid, { status })
      res.json({ success: true, message: "status updated" })

    } catch (error) {
      
      console.log(error)
      res.json({ success: false, message: error.message })  

    }


}

export { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus }

