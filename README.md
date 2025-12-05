# Task Management API (Node.js + Express + MongoDB)

## Overview
Simple Task Management backend with:
- User registration & login (JWT)
- Task CRUD (per-user)
- Filtering, sorting, pagination
- Input validation (joi)

## Quick setup

1. Clone or extract the project
2. Copy `.env.example` to `.env` and update values
3. Install dependencies:
   ```
   npm install
   ```
4. Start dev server:
   ```
   npm run dev
   ```
5. API will run at `http://localhost:5000` (or the PORT you set)

## Environment variables
- `PORT` - server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRY_TIME` - JWT token expiry time

## Endpoints

Auth:
- POST /api/users/register
  - body: { name, email, password }
- POST /api/users/login
  - body: { email, password }

Tasks (authenticated — set header `Authorization: Bearer <token>`):
- POST /api/tasks
  - body: { title, description?, priority?, status? }
- GET /api/tasks?page=1&limit=10&status=Pending&priority=High&sort=createdAt:desc
- GET /api/tasks/:id
- PUT /api/tasks/:id
  - body: { title?, description?, priority?, status? }
- DELETE /api/tasks/:id

## Notes
- Passwords are hashed using bcrypt.
- Validation handled with joi.
- Project is structured with routers, controllers, models, validatord, utils and middleware.

## Swagger API Documentation
- Swagger is set up to provide interactive API docs.
- Access the documentation at: http://localhost:5000/api-docs replace the port or url according to env.
- You can view all endpoints, schemas, and even test the APIs directly from Swagger UI.
