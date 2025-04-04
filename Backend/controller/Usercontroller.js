import userModel from "../models/Usermodel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE)
}
// route form user login
const loginUser = async (req, res) => {
    try {
      const {email,password}=req.body;
      const user =await userModel.findOne({ email })
      
      if(!user){
        return res.json({ success: false, message: "user doesn't exist" });
      }
      const isMatch =await bcrypt.compare(password,  user.password)
      if(isMatch){
        const token=createToken(user._id)
        return res.json({ success: true,token });
      }else{
        return res.json({ success: false, message: "invalid credentials" });
      }

    } catch (error ) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }

}

// route for user register
const registerUser = async (req, res) => {
   
  try {
    
    const { name, email, password } = req.body;
    
    // checking user alredy exists or not
    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.json({ success: false, message: "user alredy exist" });
    }
    //validating email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "plz enter a valid email" });
    }
    if (password.length < 4) {
      return res.json({ success: false, message: "plz enter a strong password" });
    }
    //hash
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(password, salt)
    const newuser = new userModel({ name, email, password: hashedpass })
    const user = await newuser.save();
    const token = createToken(user._id);
    res.json({ success: true, token })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}
//route for admin login
const adminLogin = async (req, res) => {
   try {
    const{email,password}=req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
      const token =jwt.sign(email+password,process.env.JWT_SECRETE)
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"invalid credentials"})
    }
   } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
   }



}
export { loginUser, registerUser, adminLogin }