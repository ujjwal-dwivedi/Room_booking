import {createBookingService, getAllBookingsService, getBookingsByUserService, getBookingsByRoomService, deleteBookingService} from '../services/bookingService.js';

export const createBooking=async(req,res)=>{
  try{
    const {room_id, start_date, end_date }=req.body;
    const result=await createBookingService(req.user.id, room_id, start_date, end_date);
    return res.status(result.statusCode).json(result);
  }catch(error)
  {
    return res.status(500).json({message:error.message});
  }
};

export const getAll=async(req,res)=>{
  try{
    const result=await getAllBookingsService();
    return res.status(result.statusCode).json(result);
  }catch(error)
  {
    return res.status(500).json({message: error.message});
  }
};

export const getByUserId=async (req, res) => {
  try{
    const result = await getBookingsByUserService(req.user.id);
    return res.status(result.statusCode).json(result);
  }catch(error)
  {
    return res.status(500).json({message: error.message});
  }
};

export const getByRoomId=async(req,res)=>{
  try{
    const result = await getBookingsByRoomService(req.params.roomId);
    return res.status(result.statusCode).json(result);
  }catch(error)
  {
    return res.status(500).json({message:error.message});
  }
};


export const deleteById=async (req,res) =>{
  try{
    const result = await deleteBookingService(req.params.id, req.user.id);
    return res.status(result.statusCode).json(result);
  }catch(error){
    return res.status(500).json({message: error.message});
  }
};