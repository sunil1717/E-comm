import express from "express";
import authUser from "../middleware/Auth.js"

import{placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus} from "../controller/Ordercontroller.js"
import adminAuth from "../middleware/Adminauth.js";

const orderRouter=express.Router();

//Admin route 
orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)

//payment features
orderRouter.post("/place",authUser ,placeOrder)
orderRouter.post("/stripe",authUser ,placeOrderStripe)
orderRouter.post("/razorpay",authUser ,placeOrderRazorpay)

//user feature
orderRouter.post("/userorders",authUser ,userOrders)


export default orderRouter;