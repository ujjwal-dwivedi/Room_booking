import pool from '../utils/db.js';
import {findOverlapping,getRoomWithConnection,insertBooking,getAllBookings,getBookingsByUserId,getBookingsByRoomId,
    findBookingByIdAndUser,deleteBooking} from '../models/bookingModel.js';

// Create Booking
//Two problems solved here:
//Problem 1: Overlapping bookings:
//   We check if any confirmed booking exists for this room in the requested date range
//
//Problem 2: Concurrent bookings along with Overlap booking
export const createBookingService=async(userId, roomId, startDate, endDate)=>{
  const connection=await pool.getConnection();
  try {
    await connection.beginTransaction();
    const overlapping=await findOverlapping(connection,roomId,startDate,endDate);
    if(overlapping.length > 0)
    {
      await connection.rollback();
      return {
        success:false,
        statusCode:409,
        message:'Room is already booked for the selected dates. Please choose different dates.'
      };
    }

    const room = await getRoomWithConnection(connection,roomId);
    if(!room)
    {
      await connection.rollback();
      return {success:false, statusCode:404, message:'Room not found.'};
    }
    const nights=Math.ceil((new Date(endDate)-new Date(startDate))/(1000*60*60*24));
    const totalPrice=room.price*nights;   //calculating total price of booking

    const bookingId = await insertBooking(connection,userId,roomId,startDate,endDate,totalPrice);
    await connection.commit();      //finally making transaction to commit
    return{
      success:true,
      statusCode:201,
      message:'Booking confirmed successfully.',
      data:{bookingId, nights, totalPrice}
    };
  }catch(error){
    await connection.rollback();
    throw error;
  }
  finally{
    connection.release();
  }
};


export const getAllBookingsService=async()=>{
  const bookings=await getAllBookings();
  return {success:true, statusCode:200, data:{bookings}};
};
export const getBookingsByUserService=async (userId) => {
  const bookings=await getBookingsByUserId(userId);
  return {success:true, statusCode:200, data:{bookings}};
};

export const getBookingsByRoomService = async (roomId) => {
  const bookings=await getBookingsByRoomId(roomId);
  return {success:true, statusCode:200, data:{bookings}};
};

export const deleteBookingService = async (bookingId, userId) => {
  const existing=await findBookingByIdAndUser(bookingId, userId);
  if (!existing) {
    return {
      success:false,
      statusCode:404,
      message: 'Booking not found or you are not the owner.',
    };
  }

  await deleteBooking(bookingId);
  return {success:true,statusCode:200, message:'Booking deleted successfully.'};
};