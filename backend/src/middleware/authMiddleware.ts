import { Hono } from 'hono';
import { verify } from 'hono/jwt';



export const authMiddleware = async (c: any, next: any) => {
    try {
  
      const authorizationHeader = c.req.header('authorization');
  
      if (!authorizationHeader) {
        c.status(401);
        return c.json({ error: 'Authorization token is required' });
      }
  
      const token = authorizationHeader.split(' ')[1]; // Extract token
  
      const payload = await verify(token, c.env.JWT_SECRET);
      c.req.user = { id: payload.id };
  
      return next();
    } catch (error) {
      console.error('Authorization error:', error);
      c.status(500);
      return c.json({ error: 'An error occurred during authorization' });
    }
  };
  