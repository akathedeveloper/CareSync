# Password Reset Functionality Documentation

## Overview
This document describes the complete password reset functionality that has been implemented for the CareSync backend.

## Endpoints

### 1. Forgot Password
**POST** `/api/auth/forgot-password`

Request body:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "If an account with that email exists, a password reset link has been sent"
}
```

### 2. Reset Password
**POST** `/api/auth/reset-password/:token`

Request body:
```json
{
  "password": "newSecurePassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

### 3. Verify Reset Token
**GET** `/api/auth/verify-reset-token/:token`

Response:
```json
{
  "success": true,
  "message": "Token is valid"
}
```

## Security Features

1. **Secure Token Generation**: Uses crypto.randomBytes() for secure token generation
2. **Token Hashing**: Tokens are hashed with SHA-256 before storage
3. **Token Expiration**: Tokens expire after 1 hour
4. **Single Use**: Tokens are marked as used after successful reset
5. **Rate Limiting**: Built-in rate limiting prevents abuse
6. **Email Validation**: Email format validation and sanitization
7. **Password Strength**: Minimum 8 character password requirement

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env` and configure:
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your email app password
   - `CLIENT_URL`: Frontend URL for reset links

3. **Email Configuration**:
   - For Gmail: Use App Password (not regular password)
   - For other providers: Update transporter configuration in passwordResetController.js

4. **Test the Flow**:
   ```bash
   # Test forgot password
   curl -X POST http://localhost:5000/api/auth/forgot-password \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'

   # Test token verification
   curl http://localhost:5000/api/auth/verify-reset-token/YOUR_TOKEN

   # Test password reset
   curl -X POST http://localhost:5000/api/auth/reset-password/YOUR_TOKEN \
     -H "Content-Type: application/json" \
     -d '{"password":"newSecurePassword123"}'
   ```

## Frontend Integration

### Forgot Password Form
```javascript
const handleForgotPassword = async (email) => {
  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Reset Password Form
```javascript
const handleResetPassword = async (token, password) => {
  try {
    const response = await fetch(`/api/auth/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Error Handling

The system handles various error scenarios:
- Invalid email format
- Non-existent email addresses (doesn't reveal user existence)
- Expired tokens
- Invalid tokens
- Weak passwords
- Server errors

## Security Considerations

1. **Token Storage**: Tokens are hashed before database storage
2. **Expiration**: All tokens expire after 1 hour
3. **Single Use**: Tokens are invalidated after use
4. **HTTPS**: Ensure HTTPS in production
5. **Rate Limiting**: Implement additional rate limiting if needed
6. **Email Security**: Use secure email configuration

## Database Schema

The PasswordReset model includes:
- `userId`: Reference to User model
- `token`: Hashed token
- `expiresAt`: Token expiration time
- `used`: Boolean flag for single-use tokens
- `timestamps`: Created/updated timestamps

## Monitoring

Monitor these metrics:
- Password reset request frequency
- Failed reset attempts
- Token expiration rate
- Email delivery success rate
