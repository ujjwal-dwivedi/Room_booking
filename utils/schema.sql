CREATE DATABASE room_booking;
USE room_booking;
CREATE TABLE users (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(255)  NOT NULL,
  password   VARCHAR(255)  NOT NULL,
  gender     ENUM('male', 'female', 'others') NOT NULL,
  dob        DATE          NOT NULL,
  created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
);
CREATE TABLE rooms (
  id                INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name              VARCHAR(150)  NOT NULL,
  price             DECIMAL(10,2) NOT NULL,
  address           VARCHAR(255)  NOT NULL,
  max_adults_allowed TINYINT      NOT NULL DEFAULT 2,
  PRIMARY KEY (id)
);
CREATE TABLE bookings (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  user_id     INT UNSIGNED  NOT NULL,
  room_id     INT UNSIGNED  NOT NULL,
  start_date  DATE          NOT NULL,
  end_date    DATE          NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);