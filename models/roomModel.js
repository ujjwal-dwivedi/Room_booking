import pool from '../utils/db.js';

export const getAllRooms=async()=>{
  const [rows]=await pool.execute('SELECT * FROM rooms');
  return rows;
};
export const getRoomById=async(id)=>{
  const [rows]=await pool.execute(
    'SELECT * FROM rooms WHERE id=?',[id]
  );
  return rows[0] || null;
};
export const createRoom=async(name, price,address, max_adults_allowed)=>{
  const [result] = await pool.execute(
    'INSERT INTO rooms (name,price,address, max_adults_allowed) VALUES (?,?,?,?)',[name, price, address, max_adults_allowed]
  );
  return result.insertId;
};
export const updateRoom=async(id, name,price,address, max_adults_allowed)=>{
  await pool.execute(
    'UPDATE rooms SET name=?, price=?, address=?, max_adults_allowed=? WHERE id=?',
    [name, price, address, max_adults_allowed, id]
  );
};
export const deleteRoom=async(id)=>{
  await pool.execute('DELETE FROM rooms WHERE id=?',[id]);
};