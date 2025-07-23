# DevTinder

A RESTful API service for a developer-focused social platform.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run local
```

## API Endpoints

### User Routes
- `POST /user/login` - User login
- `GET /user` - Get user data (Protected route)
- `GET /User/:userId` - Get specific user profile
- `POST /User` - Create new user
- `PUT /User` - Update user data
- `DELETE /User` - Delete user

### Admin Routes
- `/admin/getAllData` - Get all data (Admin only)
- `/admin/DeleteUser` - Delete a user (Admin only)

## Authentication

The API uses middleware for authentication:
- `AdminAuth` - For admin routes
- `userAuth` - For protected user routes

## Technologies Used
- Node.js
- Express.js
- Nodemon (for development)
