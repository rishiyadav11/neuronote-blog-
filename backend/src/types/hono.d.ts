// src/types/hono.d.ts
import { HonoRequest } from 'hono';

declare module 'hono' {
  interface HonoRequest {
    user?: { id: string };  // Adjust the type of user as per your JWT payload
  }
}
