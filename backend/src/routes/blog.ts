import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware";

// Create a single instance of PrismaClient
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL, // Use environment variables directly
}).$extends(withAccelerate());

export const bookRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();



bookRouter.get('/bulk', async (c) => {
  const posts = await prisma.post.findMany();

  return c.json(posts);
});

// Apply the authMiddleware to all routes that need authentication
bookRouter.use(authMiddleware);

bookRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  
  const post = await prisma.post.findUnique({
    where: {
      id,
    }
  });

  return c.json(post);
});


bookRouter.post('/add', async (c) => {
  const userId = c.req.user?.id; // Accessing userId from the middleware's user object
  if (!userId) {
    c.status(401);
    return c.json({ error: 'Unauthorized: userId not found' });
  }

  const body = await c.req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId, // Use userId for the post's author
    }
  });

  return c.json({
    id: post.id,
  });
});
bookRouter.put('/:id', async (c) => {
  const userId = c.req.user?.id; // Accessing userId from the middleware's user object
  if (!userId) {
    c.status(401);
    return c.json({ error: 'Unauthorized: userId not found' });
  }

  const id = c.req.param('id'); // Get the post id from URL params
  const body = await c.req.json(); // Get the updated post data from request body

  // Ensure post exists and the user is the author
  const post = await prisma.post.findUnique({
    where: {
      id,
      authorId: userId, // Only allow updates by the author
    },
  });

  if (!post) {
    c.status(404);
    return c.json({ error: 'Post not found or you are not the author' });
  }

  // Proceed with updating the post
  await prisma.post.update({
    where: {
      id, // Use id from URL
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.text('Post updated');
});
