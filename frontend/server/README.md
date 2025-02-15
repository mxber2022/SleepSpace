# Sleep2Earn Server

The Sleep2Earn server is a Node.js/Express application that handles authentication with WHOOP's OAuth2 API and manages user sessions. This server acts as a bridge between the React frontend and the WHOOP API, while also integrating with Supabase for data persistence.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Environment Configuration](#environment-configuration)
4. [Project Structure](#project-structure)
5. [Authentication Flow](#authentication-flow)
6. [API Endpoints](#api-endpoints)
7. [Session Management](#session-management)
8. [Database Integration](#database-integration)
9. [Development](#development)
10. [Security Considerations](#security-considerations)

## Architecture Overview

The server implements a RESTful API architecture with the following key components:

- **Express.js**: Web framework for handling HTTP requests
- **Passport.js**: Authentication middleware for WHOOP OAuth2
- **Supabase**: Database and user management
- **Express Session**: Session management with cookie-based authentication
- **CORS**: Cross-Origin Resource Sharing configuration

## Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account and project
- WHOOP API credentials

## Environment Configuration

Create a `.env` file in the server directory with the following variables:

```env
WHOOP_API_HOSTNAME=https://api.prod.whoop.com
WHOOP_CLIENT_ID=your_whoop_client_id
WHOOP_CLIENT_SECRET=your_whoop_client_secret
WHOOP_CALLBACK_URL=http://localhost:5173/api/auth/whoop/callback
SESSION_SECRET=your_session_secret

# Supabase configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
server/
├── config/
│   └── passport.js     # Passport.js OAuth2 configuration
├── routes/
│   └── auth.js         # Authentication route handlers
├── .env                # Environment variables
├── index.js            # Server entry point
├── package.json        # Dependencies and scripts
└── README.md          # This documentation
```

## Authentication Flow

1. **Initial Request**: Frontend redirects to `/api/auth/whoop`
2. **WHOOP OAuth**: User authenticates with WHOOP
3. **Callback**: WHOOP redirects to `/api/auth/whoop/callback`
4. **Session Creation**: Server creates session and stores user data
5. **Frontend Redirect**: User is redirected to profile page

### Passport.js Configuration

The `passport.js` configuration handles:
- OAuth2 strategy setup
- User profile fetching
- Session serialization/deserialization
- Supabase user management

## API Endpoints

### Authentication Routes

```
GET /api/auth/whoop
- Initiates WHOOP OAuth2 flow
- Requires: None
- Returns: Redirects to WHOOP login

GET /api/auth/whoop/callback
- Handles OAuth2 callback
- Requires: OAuth2 code and state
- Returns: Redirects to frontend profile page

GET /api/auth/status
- Checks authentication status
- Requires: Valid session cookie
- Returns: { isAuthenticated: boolean, user: Object }

POST /api/auth/logout
- Logs out user and destroys session
- Requires: Valid session cookie
- Returns: { success: true }
```

## Session Management

Sessions are managed using `express-session` with the following configuration:

```javascript
{
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax',
    path: '/'
  },
  name: 'sleep2earn.sid'
}
```

## Database Integration

Supabase is used for storing user data with the following schema:

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  whoop_user_id text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The server will start on port 3001 by default.

## Security Considerations

1. **Session Security**:
   - HTTPOnly cookies prevent XSS attacks
   - Secure cookie flag in production
   - SameSite cookie policy
   - Session secret environment variable

2. **CORS Configuration**:
   - Restricted to frontend origin
   - Credentials enabled for session cookies
   - Limited HTTP methods and headers

3. **OAuth2 Security**:
   - State parameter validation
   - Secure token storage
   - HTTPs in production

4. **Error Handling**:
   - Sanitized error responses
   - Proper logging
   - No sensitive data exposure

## Error Handling

The server implements a global error handler:

```javascript
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});
```

## Logging

Debug logging is implemented for:
- Request URLs
- Session IDs
- Authentication status
- OAuth2 flow events

## Production Deployment

For production:

1. Set environment variables:
   - NODE_ENV=production
   - Secure WHOOP callback URL
   - Production Supabase credentials

2. Enable HTTPS
3. Configure secure session storage
4. Set appropriate CORS origins
5. Enable production logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details



_______________________________________________________________________________-
We're using Supabase in the server primarily for user data persistence and management after OAuth authentication with WHOOP. Here's why:

User Data Storage:

After successful WHOOP OAuth authentication, we need to store user information and tokens
Supabase provides a secure and scalable PostgreSQL database for this purpose
Token Management:

We store WHOOP access_token and refresh_token in Supabase
This allows us to maintain user sessions and refresh tokens when needed
Session Association:

The server uses Express sessions (cookies) for authentication
The session is linked to the user data stored in Supabase
When a user makes a request, we can look up their full profile in Supabase
User Profile Data:

Stores user information from WHOOP (first_name, last_name, whoop_user_id)
Provides a single source of truth for user data
Here's the flow:

User authenticates with WHOOP
Server receives tokens and user profile
Server stores/updates user data in Supabase
Server creates session cookie
Frontend uses session cookie for subsequent requests
Server validates session and retrieves user data from Supabase as needed
The server acts as a middleware between the frontend and Supabase, ensuring secure data storage and retrieval while maintaining user sessions.

Would you like me to explain any specific part of this integration in more detail?