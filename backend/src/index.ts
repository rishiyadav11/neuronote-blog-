import { Hono } from 'hono'
import { userRouter } from './routes/user'
import {bookRouter} from './routes/blog';
import { cors } from 'hono/cors';

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();



  app.use("/*", cors({
    origin: '*', // You can change '*' to your frontend domain in production
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Authorization', 'Content-Type', 'X-XSRF-TOKEN'], // Include any custom headers you're using
    exposeHeaders: ['Authorization', 'X-XSRF-TOKEN'],
    maxAge: 600,
    credentials: true, // Allows credentials (cookies) to be sent
  }))


  app.options("*", (c) => c.text('OK'))

app.get('/', (c) => c.text('hello this is'))


app.route('/api/v1/user', userRouter)
app.route('/api/v1/book', bookRouter)

export default app