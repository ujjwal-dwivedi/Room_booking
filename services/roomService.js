import {getAllRooms,getRoomById,createRoom,updateRoom,deleteRoom} from '../models/roomModel.js';

export const getAllRoomsService=async()=>{
  const rooms=await getAllRooms();
  return {success:true, statusCode:200, data:{rooms}};
};

export const getRoomByIdService=async(id)=> {
  const room=await getRoomById(id);
  if(!room)
    {
        return {success:false, statusCode:404, message:'Room not found.'};
    }
  return {success:true, statusCode:200, data: {room}};
};

export const createRoomService=async(name,price,address, max_adults_allowed)=>{
  const roomId=await createRoom(name,price,address,max_adults_allowed);
  return {success:true, statusCode:201, message:'Room created successfully.', data: {roomId}};
};

export const updateRoomService=async(id,name,price,address,max_adults_allowed)=>{
  const room=await getRoomById(id);
  if(!room)
  {
    return {success:false, statusCode:404, message:'Room not found.'};
  }
  await updateRoom(id, name, price,address, max_adults_allowed);
  return {success:true, statusCode:200, message:'Room updated successfully.'};
};

export const deleteRoomService=async(id)=>{
  const room=await getRoomById(id);
  if(!room) {
    return {success:false, statusCode:404, message:'Room not found.'};
  }
  await deleteRoom(id);
  return { success:true, statusCode:200, message:'Room deleted successfully.'};
};