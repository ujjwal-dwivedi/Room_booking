import pool from '../utils/db.js';

export const findOverlapping=async(connection, roomId,startDate, endDate)=>{  //using transaction connection to avoid overlapping
  const [rows] = await connection.execute(
    `SELECT id FROM bookings
     WHERE room_id=?
     AND start_date<?
     AND end_date>?
     FOR UPDATE`,        //FOR UPDATE locks row to avoid any concurrent booking
    [roomId,endDate,startDate]
  );
  return rows;
};

export const getRoomWithConnection=async(connection,roomId)=>{        //using transaction connection
  const [rows]=await connection.execute(
    'SELECT * FROM rooms WHERE id=?',[roomId]
  );
  return rows[0] ||null;
};
export const insertBooking=async(connection, userId, roomId, startDate,endDate, totalPrice)=>{
  const [result]=await connection.execute(
    `INSERT INTO bookings (user_id,room_id,start_date,end_date,total_price) VALUES (?,?,?,?,?)`,
    [userId, roomId,startDate,  endDate, totalPrice]
  );
  return result.insertId;
};
export const getAllBookings= async()=>{
  const [rows]=await pool.execute(
    `SELECT b.*, u.name AS user_name, r.name AS room_name
     FROM bookings b
     JOIN users u ON u.id=b.user_id
     JOIN rooms r ON r.id=b.room_id`
  );
  return rows;
};
export const getBookingsByUserId=async(userId)=>{
  const [rows]=await pool.execute(
    `SELECT b.*, r.name AS room_name, r.address
     FROM bookings b
     JOIN rooms r ON r.id=b.room_id
     WHERE b.user_id=?`,
    [userId]
  );
  return rows;
};

export const getBookingsByRoomId=async(roomId)=>{
  const [rows]=await pool.execute(
    `SELECT b.*, u.name AS user_name
     FROM bookings b
     JOIN users u ON u.id=b.user_id
     WHERE b.room_id=?`,[roomId]
  );
  return rows;
};

export const findBookingByIdAndUser=async(bookingId,userId)=>{
  const [rows]=await pool.execute(
    'SELECT * FROM bookings WHERE id=? AND user_id=?',[bookingId,userId]
  );
  return rows[0] ||null;
};

export const deleteBooking=async(bookingId)=>{
  await pool.execute('DELETE FROM bookings WHERE id= ?',[bookingId]);
};