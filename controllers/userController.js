import {registerService,loginService,updateUserService} from '../services/userService.js';

const cookieOptions = {
  maxAge:7*24*60*60*1000,
  httpOnly:true,
  sameSite:'strict'
};

export const register=async(req,res)=>{
  try {
    const {name,email,password,gender,dob}=req.body;
    const result=await registerService(name, email, password,gender,dob);

    if(!result.success)
    {
      return res.status(result.statusCode).json(result);
    }
    return res
      .status(result.statusCode)
      .cookie('token', result.data.token, cookieOptions)
      .json({
        success: true,
        message: result.message,
        data: { userId: result.data.userId },
      });
  }catch(error){
    return res.status(500).json({message:error.message});
  }
};

export const login=async(req,res)=>{
  try {
    const {email,password} =req.body;
    const result=await loginService(email,password);

    if(!result.success)
    {
      return res.status(result.statusCode).json(result);
    }
    return res
      .status(result.statusCode)
      .cookie('token', result.data.token, cookieOptions)
      .json({
        success: true,
        message: result.message,
      });
  }catch(error){
    return res.status(500).json({ message: error.message });
  }
};

export const update=async(req,res)=>{
  try {
    const {name, gender, dob}=req.body;
    const result=await updateUserService(req.user.id, name, gender, dob);
    return res.status(result.statusCode).json(result);
  }
  catch(error){
    return res.status(500).json({message:error.message});
  }
};

export const logout=(req,res)=>{
  try {
    return res
      .status(200)
      .cookie('token', '', {maxAge:0})
      .json({
        success:true,
        message:'Logged out successfully.',
      });
  }
  catch(error)
  {
    return res.status(500).json({message:error.message});
  }
};