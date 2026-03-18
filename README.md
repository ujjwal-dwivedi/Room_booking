# Room Booking API

A REST API for booking hotel rooms built with Node.js, Express and MySQL.

## Setup

### 1.Clone and install
```bash
git clone <your-repo-url>
cd room-booking-api
npm install
```

### 2.Create .env file
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=room_booking
JWT_SECRET=any_long_random_string
```

### 3.Set up database
   - Open MySQL Workbench
   - Run `CREATE DATABASE room_booking;`
   - Run all queries inside `utils/schema.sql`

### 4.Start the server
```bash
npm run dev
```

## Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/users/register` | No | Register |
| POST | `/users/login` | No | Login |
| PUT | `/users/update` | Yes | Update profile |
| POST | `/users/logout` | Yes | Logout |
| GET | `/rooms` | No | Get all rooms |
| GET | `/rooms/:id` | Yes | Get room by id |
| POST | `/rooms` | Yes | Create room |
| PUT | `/rooms/:id` | Yes | Update room |
| DELETE | `/rooms/:id` | Yes | Delete room |
| POST | `/bookings` | Yes | Create booking |
| GET | `/bookings` | Yes | Get all bookings |
| GET | `/bookings/user` | Yes | My bookings |
| GET | `/bookings/room/:roomId` | Yes | Bookings by room |
| DELETE | `/bookings/:id` | Yes | Delete booking |