import { cors } from 'hono/cors';

export const authCors = cors({
  origin: process.env.BASE_URL || 'http://localhost:3000', // replace with your origin
  credentials: true,
});
