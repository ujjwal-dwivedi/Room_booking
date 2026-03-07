import dotenv from 'dotenv';
import express from 'express';
import pool from './utils/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);

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