# 🏡 Estate — Real Estate Web App

A full-stack Real Estate platform (**MERN-oriented**): React SPA + Express REST API, JWT auth, and MongoDB-backed users. Browse insights, news, and property-focused UI with a responsive layout.

## Tech stack

**Frontend:** React (Vite), React Router, Tailwind CSS, Axios, Lucide React, Context API, lazy-loaded routes, debounced interactions.  
**Backend:** Node.js, Express (MVC-style `routes/` · `controller/` · `services/`), CORS, `express.json()`, centralized error middleware, **JWT** + **bcrypt** (`/api/auth`).  
**Data:** MongoDB + Mongoose (users); seed JSON for **`/api/research`**, **`/api/news`**, sample **`/api/properties`** until full listing CRUD.

**Next:** Next.js with TypeScript for a production-grade app shell (planned).

## API (selected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/research` | Research / insights cards |
| `GET` | `/api/news` | News items |
| `GET` | `/api/properties` | Listings (seed; auth for `POST`) |
| `POST` | `/api/auth/register/send-otp` | Start registration (SMS/console in dev) |
| `POST` | `/api/auth/register/verify-otp` | Step 1: verify OTP |
| `POST` | `/api/auth/register/complete` | Step 2: name, email, terms → JWT |
| `POST` | `/api/auth/login/send-otp` · `verify-otp` | Login with phone OTP → JWT |
| `GET` | `/api/auth/me` | Current user (Bearer token) |

## Run locally

```bash
npm install && npm run dev
cd src/Backend && npm install && npm start
```

Frontend · `http://localhost:5173` · API · `http://localhost:3055` · Set `MONGODB_URI`, `JWT_SECRET` (backend `.env`) and optional `VITE_API_URL` (frontend `.env`).

## Preview

<img src="https://cdn.phototourl.com/free/2026-04-01-0da3779f-70d1-444c-b4ee-1c46d62070fe.png" alt="Estate landing page" width="800" />
