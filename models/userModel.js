import pool from '../utils/db.js';

export const findUserByEmail=async(email)=>{
  const [rows]=await pool.execute(
    'SELECT * FROM users WHERE email = ?',[email]
  );
  return rows[0] ||null;
};
export const findUserById=async(id)=>{
  const [rows]=await pool.execute(
    'SELECT id, name, email, gender, dob, created_at FROM users WHERE id = ?',[id]
  );
  return rows[0] || null;
};
export const createUser=async(name, email, hashedPassword, gender, dob)=>{
  const [result]=await pool.execute(
    'INSERT INTO users (name,email, password,gender,dob) VALUES (?,?,?,?,?)',[name, email, hashedPassword,gender, dob]
  );
  return result.insertId;
};
export const updateUser=async(userId, name, gender, dob)=>{
  await pool.execute(
    'UPDATE users SET name=?, gender=?, dob=? WHERE id=?',[name, gender, dob, userId]
  );
};