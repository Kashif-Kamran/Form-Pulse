# User Management API Documentation

## Overview

This document describes the user management APIs implemented for the Form-Pulse application. All user management endpoints are restricted to Admin users only.

## Base URL

```
/api/users
```

## Authentication

All endpoints require authentication with Admin role permissions.

## Endpoints

### 1. Get Users List

**GET** `/users/list`

Retrieves a paginated list of users with optional filtering.

**Query Parameters:**

- `q` (optional): Search query - searches in name, email, and role fields
- `role` (optional): Filter by user role (Admin, Veterinarian, Nutritionist, Care Taker)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)

**Example Request:**

```bash
GET /api/users/list?q=john&role=Admin&page=1&limit=10
```

**Response:**

```json
{
  "results": [
    {
      "id": "64f8b2c1e5a2b3c4d5e6f7a8",
      "name": "John Doe",
      "email": "john.doe@formpulse.com",
      "role": "Admin",
      "isVerified": true,
      "isDeleted": false,
      "deletedAt": null,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### 2. Create User

**POST** `/users/create`

Creates a new user account. Admin-created users are verified by default.

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@formpulse.com",
  "password": "SecurePassword123!",
  "role": "Veterinarian",
  "isVerified": true
}
```

**Response:**

```json
{
  "id": "64f8b2c1e5a2b3c4d5e6f7a9",
  "name": "Jane Smith",
  "email": "jane.smith@formpulse.com",
  "role": "Veterinarian",
  "isVerified": true,
  "isDeleted": false,
  "deletedAt": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 3. Update User

**PUT** `/users/:userId`

Updates an existing user's information.

**Path Parameters:**

- `userId`: The ID of the user to update

**Request Body:**

```json
{
  "name": "Jane Smith Updated",
  "email": "jane.smith.updated@formpulse.com",
  "role": "Nutritionist",
  "isVerified": false
}
```

**Response:**

```json
{
  "id": "64f8b2c1e5a2b3c4d5e6f7a9",
  "name": "Jane Smith Updated",
  "email": "jane.smith.updated@formpulse.com",
  "role": "Nutritionist",
  "isVerified": false,
  "isDeleted": false,
  "deletedAt": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

### 4. Delete User (Soft Delete)

**DELETE** `/users/:userId`

Soft deletes a user. The user record is marked as deleted but remains in the database.

**Path Parameters:**

- `userId`: The ID of the user to delete

**Response:**

```json
{
  "message": "User deleted successfully",
  "deletedAt": "2024-01-01T12:00:00.000Z",
  "userId": "64f8b2c1e5a2b3c4d5e6f7a9"
}
```

### 5. Get Public Users (Legacy)

**GET** `/users/public`

Public endpoint for backwards compatibility. Same functionality as `/users/list` but without authentication.

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Failed to create user",
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 403 Forbidden

```json
{
  "statusCode": 403,
  "message": "Insufficient permissions",
  "error": "Forbidden"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

### 409 Conflict

```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

## Validation Rules

### Create User

- **name**: Required, minimum 2 characters
- **email**: Required, valid email format
- **password**: Required, minimum 8 characters
- **role**: Required, must be one of: Admin, Veterinarian, Nutritionist, Care Taker
- **isVerified**: Optional, boolean (defaults to true)

### Update User

- **name**: Optional, minimum 2 characters if provided
- **email**: Optional, valid email format if provided
- **role**: Optional, must be valid role if provided
- **isVerified**: Optional, boolean if provided

## Security Features

1. **Admin-Only Access**: All endpoints require Admin role authentication
2. **Soft Delete**: Users are marked as deleted but not physically removed
3. **Email Uniqueness**: Prevents duplicate email addresses
4. **Password Hashing**: Passwords are hashed using bcrypt
5. **Input Validation**: All inputs are validated using class-validator

## Database Schema Updates

The User model has been updated to include:

- `isDeleted` (boolean, default: false)
- `deletedAt` (Date, nullable)
- `createdAt` (Date, default: current timestamp)
- `updatedAt` (Date, default: current timestamp)

## Related Records

When a user is soft deleted, all related records (animals, diet plans, health records, etc.) are **preserved** and remain accessible. The system does not cascade delete related records.

## Migration Required

After deploying these changes, run the migration to update existing user records:

```bash
npm run migrate
```

This will add the new fields to existing user documents with appropriate default values.

## Testing

Use the following curl commands to test the APIs:

```bash
# Get users list
curl -X GET "http://localhost:3000/api/users/list" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Create user
curl -X POST "http://localhost:3000/api/users/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"name":"Test User","email":"test@formpulse.com","password":"Password123!","role":"Veterinarian"}'

# Update user
curl -X PUT "http://localhost:3000/api/users/USER_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"name":"Updated Name","isVerified":false}'

# Delete user
curl -X DELETE "http://localhost:3000/api/users/USER_ID" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Integration with Frontend

The frontend user management component should be updated to use these new endpoints:

1. Replace mock data with actual API calls
2. Implement proper error handling
3. Add loading states
4. Handle pagination
5. Add search functionality

The API structure is designed to be compatible with the existing frontend implementation.
