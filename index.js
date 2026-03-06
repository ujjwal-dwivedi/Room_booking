import dotenv from 'dotenv';
import express from 'express';
import pool from './utils/db.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Room Booking API is running' });
});

try {
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully');
    connection.release();
    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
} catch (error) {
    console.error('MySQL connection failed:', error.message);
    process.exit(1);
}