# Gym Class Scheduling and Membership Management System

## Project Overview

The Gym Class Scheduling and Membership Management System is a comprehensive solution designed to efficiently manage gym operations. The system implements three distinct roles (Admin, Trainer, and Trainee) with specific permissions for each. Admins can create and manage trainers, schedule classes, and assign trainers to these schedules. Each day can have a maximum of five class schedules, with each class lasting exactly two hours. Trainers can view their assigned schedules but cannot create new ones or manage trainee profiles. Trainees can create and manage their profiles and book class schedules if slots are available, with a maximum of ten trainees per schedule.

The system enforces business rules such as schedule limits, booking capacity, and time slot validation to ensure smooth operations. JWT-based authentication controls access based on user roles, and comprehensive error handling is implemented throughout the application.

## Relation Diagram

![Alt text](https://github.com/sshammi/Gym-Management-backend/blob/00f7f1be28ae57b66f0d887e3261fe3347687314/gym_management.png)

## Technology Stack

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **ODM**: Mongoose
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Security**: bcrypt
- **Development Tools**: ts-node-dev, ESLint, Prettier


## API Endpoints

### Authentication

| Method | Endpoint | Description | Access
|-----|-----|-----|-----
| POST | /api/users/login | User login | Public


### User Management

| Method | Endpoint         | Description       | Access            |
|--------|------------------|-------------------|-------------------|
| POST   | /api/users/login | Login user        | Public            |
| POST   | /api/users       | Create user       | Public            |
| GET    | /api/users       | Get all users     | Admin             |
| GET    | /api/users/:id   | Get user by ID    | Admin, Trainer, Trainee, Self |
| PATCH  | /api/users/:id   | Update user       | Admin, Trainer, Trainee, Self |
| DELETE | /api/users/:id   | Delete user       | Admin             |


### Class Schedule Management

| Method | Endpoint                         | Description               | Access                  |
|--------|----------------------------------|---------------------------|-------------------------|
| POST   | /api/schedules                   | Create class schedule     | Admin                   |
| GET    | /api/schedules                   | Get all schedules         | Admin, Trainer, Trainee |
| GET    | /api/schedules/:id               | Get schedule by ID        | Admin, Trainer, Trainee |
| PATCH  | /api/schedules/:id               | Update schedule           | Admin                   |
| DELETE | /api/schedules/:id               | Delete schedule           | Admin                   |
| GET    | /api/schedules/trainer/:trainerId| Get schedules by trainer  | Admin, Trainer          |


### Booking Management

| Method | Endpoint                              | Description               | Access            |
|--------|---------------------------------------|---------------------------|-------------------|
| POST   | /api/bookings                         | Create booking            | Trainee           |
| GET    | /api/bookings                         | Get all bookings          | Admin             |
| GET    | /api/bookings/:id                     | Get booking by ID         | Admin, Trainee    |
| PATCH  | /api/bookings/:id                     | Update booking status     | Trainee           |
| DELETE | /api/bookings/:id                     | Delete booking            | Trainee           |
| GET    | /api/bookings/my-bookings/:traineeId  | Get trainee's bookings    | Trainee           |
| GET    | /api/bookings/schedule/:scheduleId    | Get bookings by schedule  | Admin, Trainer    |


## API Response Format

### Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "statusCode": "according to error",
  "message": "Error message",
  "errorDetails": { ... }
}
```

## Database Schema

### User Model

```typescript
{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'trainer', 'trainee'],
      default: 'trainee',
    },
    contactNo: {
      type: String,
    },
    address: {
      type: String,
    },
    profileImg: {
      type: String,
    }
}
```

### Class Schedule Model

```typescript
{
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainer is required'],
    },
    maxCapacity: {
      type: Number,
      default: 10,
      min: [1, 'Capacity must be at least 1'],
      max: [10, 'Capacity cannot exceed 10'],
    },
    status: {
      type: String,
      enum:['active', 'cancelled', 'completed'],
      default: 'active',
    },
}
```

### Booking Model

```typescript
{
    traineeId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainee is required'],
    },
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: 'ClassSchedule',
      required: [true, 'Class schedule is required'],
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled', 'completed'],
      default: 'booked',
    },
}
```

## Admin Credentials

To access the admin features, use the following credentials:

```plaintext
Email: admin@gmail.com
Password: Admin123
```

**Note**: You'll need to create this admin user first using the database seeder or by manually inserting it into the database.

## Instructions to Run Locally

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git


### Installation Steps

1. Clone the repository:

```shellscript
git clone https://github.com/sshammi/Gym-Management-backend.git
cd gym-management-backend
```


2. Install dependencies:

```shellscript
npm install
```


3. Create a `.env` file in the root directory with the following variables:

```plaintext
NODE_ENV=development
PORT= 5000
DATABASE_URL= provide mongodb url
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10
```


4. Create an admin user:

You can create an admin user by making a POST request to `/api/users` with the following data:

```json
{
  "name": "Admin User",
  "email": "admin@gmail.com",
  "password": "Admin123",
  "role": "admin"
}
```

Or you can create a seed script to initialize the database with an admin user.


5. Build the project:

```shellscript
npm run build
```


6. Start the server:

```shellscript
npm start
```

For development with auto-reload:

```shellscript
npm run dev
```


7. The server will be running at `http://localhost:5000`


### API Testing

You can test the API using tools like Postman or cURL. Here's an example of how to log in:

```shellscript
POST http://localhost:5000/api/users/login 
"Content-Type: application/json" 
{
  "email": "admin@gmail.com",
  "password": "Admin123"
}
```

## Business Rules Implementation

1. **Class Scheduling Limits**:

1. Maximum 5 class schedules per day
2. Each class must be exactly 2 hours long



2. **Booking System**:

1. Maximum 10 trainees per class schedule
2. Trainees cannot book multiple classes in the same time slot
3. Trainees can cancel their bookings



3. **Role-Based Access Control**:

1. Admins: Full access to create/manage trainers, schedules, and view all data
2. Trainers: Can view their assigned schedules and related bookings
3. Trainees: Can manage their profiles and book available classes





## Live Hosting Link

https://gym-management-theta-khaki.vercel.app/

## Error Handling

The system implements comprehensive error handling for:

- Validation errors
- Unauthorized access
- Resource not found
- Booking limit exceeded
- Schedule limit exceeded
- Database errors


## Future Enhancements

- Email notifications for bookings and schedule changes
- Payment integration for membership fees
- Attendance tracking system
- Performance analytics and reporting
