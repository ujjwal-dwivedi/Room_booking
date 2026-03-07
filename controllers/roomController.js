import {getAllRoomsService,getRoomByIdService,createRoomService,updateRoomService,deleteRoomService} from '../services/roomService.js';

export const getAll= async(req,res)=>{
  try
  {
    const result= await getAllRoomsService();
    return res.status(result.statusCode).json(result);
  }catch(error)
  {
    return res.status(500).json({message: error.message});
  }
};

export const getById=async(req,res)=>{
  try{
    const result=await getRoomByIdService(req.params.id);
    return res.status(result.statusCode).json(result);
  }
  catch(error)
  {
    return res.status(500).json({message:error.message});
  }
};

export const createRoom=async(req,res)=>{
  try{
    const {name, price, address, max_adults_allowed}=req.body;
    const result= await createRoomService(name, price, address, max_adults_allowed);
    return res.status(result.statusCode).json(result);
  }catch(error)
  {
    return res.status(500).json({message: error.message});
  }
};

export const update=async(req,res) =>{
  try{
    const {name, price, address, max_adults_allowed}=req.body;
    const result= await updateRoomService(req.params.id, name, price, address, max_adults_allowed);
    return res.status(result.statusCode).json(result);
  }catch(error)
  {
    return res.status(500).json({message:error.message});
  }
};

export const deleteRoom=async(req,res)=>{
  try{
    const result= await deleteRoomService(req.params.id);
    return res.status(result.statusCode).json(result);
  }catch(error)
  {
    return res.status(500).json({message: error.message});
  }
};