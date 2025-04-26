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
  const userId = c.req.user?.id;
  if (!userId) {
    c.status(401);
    return c.json({ error: 'Unauthorized: userId not found' });
  }

  const body = await c.req.json();
  
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      media: body.media, // <-- Add this line
      authorId: userId,
    }
  });

  return c.json({
    id: post.id,
  });
});




bookRouter.put('/:id', async (c) => {
  const userId = c.req.user?.id;
  if (!userId) {
    c.status(401);
    return c.json({ error: 'Unauthorized: userId not found' });
  }

  const id = c.req.param('id');
  const body = await c.req.json();

  const post = await prisma.post.findUnique({
    where: {
      id,
      authorId: userId,
    },
  });

  if (!post) {
    c.status(404);
    return c.json({ error: 'Post not found or you are not the author' });
  }

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      content: body.content,
      media: body.media, // <-- Add this line
    },
  });

  return c.text('Post updated');
});


bookRouter.delete('/:id', async (c) => {
  const userId = c.req.user?.id;
  if (!userId) {
    c.status(401);
    return c.json({ error: 'Unauthorized: userId not found' });
  }

  const id = c.req.param('id');

  const post = await prisma.post.findUnique({
    where: {
      id,
      authorId: userId, // Ensure only author can delete
    },
  });

  if (!post) {
    c.status(404);
    return c.json({ error: 'Post not found or you are not the author' });
  }

  await prisma.post.delete({
    where: {
      id,
    },
  });

  return c.json({ message: 'Post deleted successfully' });
});




bookRouter.delete('/bulk/delete', async (c) => {
  const userId = c.req.user?.id;
  if (!userId) {
    c.status(401);
    return c.json({ error: 'Unauthorized: userId not found' });
  }

  const body = await c.req.json(); // Expecting { ids: ["id1", "id2", "id3"] }
  
  if (!Array.isArray(body.ids)) {
    c.status(400);
    return c.json({ error: 'Invalid request. "ids" should be an array.' });
  }

  const result = await prisma.post.deleteMany({
    where: {
      id: {
        in: body.ids,
      },
      authorId: userId, // Safety: only delete your own posts
    },
  });

  return c.json({
    message: `${result.count} posts deleted successfully`,
  });
});
