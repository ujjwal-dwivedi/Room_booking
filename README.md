# Room Booking API

A REST API for booking hotel rooms built with Node.js, Express and MySQL.

## Setup

1. **Clone and install**
```bash
git clone <your-repo-url>
cd room-booking-api
npm install
```

2. **Create .env file**
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=room_booking
JWT_SECRET=any_long_random_string
```

3. **Set up database**
   - Open MySQL Workbench
   - Run `CREATE DATABASE room_booking;`
   - Run all queries inside `sql/schema.sql`

4. **Start the server**
```bash
npm run dev
```

## Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/users/register` | No | Register |
| POST | `/api/users/login` | No | Login |
| PUT | `/api/users/update` | Yes | Update profile |
| POST | `/api/users/logout` | Yes | Logout |
| GET | `/api/rooms` | Yes | Get all rooms |
| GET | `/api/rooms/:id` | Yes | Get room by id |
| POST | `/api/rooms` | Yes | Create room |
| PUT | `/api/rooms/:id` | Yes | Update room |
| DELETE | `/api/rooms/:id` | Yes | Delete room |
| POST | `/api/bookings` | Yes | Create booking |
| GET | `/api/bookings` | Yes | Get all bookings |
| GET | `/api/bookings/user` | Yes | My bookings |
| GET | `/api/bookings/room/:roomId` | Yes | Bookings by room |
| PUT | `/api/bookings/:id` | Yes | Update booking |
| DELETE | `/api/bookings/:id` | Yes | Delete booking |