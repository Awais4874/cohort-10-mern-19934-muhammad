# NotesMesh Backend

TypeScript backend for the NotesMesh notes management application.

## Tech stack

- Node.js, Express 5 and TypeScript
- MongoDB with Mongoose
- Pino and pino-http for structured logging
- Helmet and CORS for HTTP security configuration

## Prerequisites

- Node.js 20 or later
- npm
- A running MongoDB instance or MongoDB Atlas connection string

## Getting started

1. Open a terminal in the `backend` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure `MONGODB_URI`.
4. Start the development server:

   ```bash
   npm run dev
   ```

5. Check the API:

   - `GET http://localhost:5000/`
   - `GET http://localhost:5000/api/v1/health`

The health endpoint returns HTTP 503 when MongoDB is not connected.

## Available scripts

- `npm run dev` — start with automatic reload
- `npm run typecheck` — run TypeScript type checking
- `npm run build` — compile TypeScript into `dist`
- `npm start` — run the compiled server

## Environment variables

See `.env.example` for the required configuration. Never commit your real `.env` file or secrets.