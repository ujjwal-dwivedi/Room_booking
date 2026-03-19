import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {findUserByEmail,findUserById,createUser,updateUser} from '../models/userModel.js';

const generateToken = (userId, email) => {
  return jwt.sign(
    { id: userId, email: email },
    process.env.JWT_SECRET,
    { expiresIn:'7d' }
  );
};

export const registerService = async (name, email, password, gender, dob) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    return {
      success: false,
      statusCode: 409,
      message: 'Email already registered.',
    };
  }
  const hashedPassword=await bcrypt.hash(password, 10);
  const userId = await createUser(name, email, hashedPassword, gender, dob);
  const token = generateToken(userId, email);
  return {
    success:true,
    statusCode:201,
    message:'Registered successfully.',
    data:{userId,token},
  };
};

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);
  if(!user) 
  {
    return {
      success:false,
      statusCode:401,
      message:'Invalid email or password.',
    };
  }

  const isMatch=await bcrypt.compare(password, user.password);
  if(!isMatch)
  {
    return {
      success:false,
      statusCode:401,
      message:'Invalid email or password.'
    };
  }

  const token = generateToken(user.id, user.email);

  return {
    success: true,
    statusCode: 200,
    message: 'Login successful.',
    data:{token},
  };
};

export const updateUserService = async (userId, name, gender, dob) => {
  const user = await findUserById(userId);
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: 'User not found.'
    };
  }
  const updatedName= name?? user.name;
  const updatedGender= gender?? user.gender;
  const updatedDob= dob?? user.dob;
  await updateUser(userId, updatedName, updatedGender, updatedDob);
  return {
    success:true,
    statusCode:200,
    message:'Profile updated successfully.'
  };
};