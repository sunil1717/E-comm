import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/Mongodb.js"
import connectCloudinary from "./config/Cloudnary.js"
import userRouter from "./routes/Userroute.js"
import productRouter from "./routes/Productroute.js"
import cartRouter from "./routes/Cartroute.js"
import orderRouter from "./routes/Orderroute.js"



const app=express()
const port=process.env.PORT || 4000
connectDB();
connectCloudinary();
//middlewares

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));


//api end point
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("api work")
})

app.listen(port,()=>console.log("server started on port :"+port))

