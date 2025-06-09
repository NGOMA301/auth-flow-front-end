# Frontend - Auth System

This frontend is part of an authentication system that interacts with a Node.js backend API. It includes login, registration, profile display, and session handling.

## Features

- User registration with profile picture upload
- Login with username or email
- Authenticated user profile retrieval
- Secure cookies for access and refresh tokens
- Session management UI (optional)
- Logout functionality

## Setup Instructions

1. **Install dependencies**

```bash
npm install
```

2. **Environment variables**

Create a `.env` file and set the API base URL:

```env
VITE_API_URL=http://localhost:5000
```

3. **Run the development server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

## Notes

- The frontend uses cookies to authenticate requests (HTTP-only cookies).
- Use `/me` to fetch the authenticated user profile.
