
import mongoose from "mongoose"
const connectDB=async()=>{
    mongoose.connection.on("connected",()=>{
        console.log("Db connected")
    })
   await mongoose.connect(`${process.env.MONGODB_URI}/e-comerce`,{
    

    serverSelectionTimeoutMS: 30000, 
   })


}
export default connectDB;