# Backend Setup (CareSync)

## Installation
1. Navigate to the backend folder \
` cd backend `
2. Install dependencies \
` npm install `
3. Create a `.env` file in the `backend` folder with the following values: \
``` 
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run the server \
` npm run dev`

## Health Check
Open in your browser: \
http://localhost:5000/health 

You should see: \
` { "status": "Backend is running" }`

## Authentication API
1) Register a User \
POST /api/auth/register \
Body (JSON):

<pre>
{
  "name": "Aadi",
  "email": "aadi@test.com",
  "password": "pass1234"
}
</pre>

Response:
```
{
  "message": "Registered successfully",
  "token": "<JWT_TOKEN>",
  "user": {
    "id": "...",
    "name": "Aadi",
    "email": "aadi@test.com"
  }
}
```

2) Login
POST /api/auth/login
Body (JSON):
```
{
  "email": "aadi@test.com",
  "password": "pass1234"
}
```

3) Get User Profile (Protected)
GET /api/auth/me
Headers:
```
Authorization: Bearer <JWT_TOKEN>
```

Response:
```
{
  "user": {
    "id": "...",
    "name": "Aadi",
    "email": "aadi@test.com"
  }
}
```

## Tech Stack
* Node.js

* Express.js

* MongoDB (via Mongoose)

* JWT Authentication

* Middleware: CORS, Morgan, Error Handling
