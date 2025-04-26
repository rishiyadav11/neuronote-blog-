  import { PrismaClient } from "@prisma/client/edge";
  import { withAccelerate } from "@prisma/extension-accelerate";
  import { Hono } from "hono";
  import { sign } from "hono/jwt";
  import bcrypt from "bcryptjs";
  import { signupSchema, signinSchema } from "nauronotescommon";

  export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();



  // Signup route with Zod validation
  userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Validate the request body using Zod
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      c.status(400);
      return c.json({ error: "Invalid input", details: parsed.error.errors });
    }

    const { email, name, password } = parsed.data;  // Include 'name' here

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const user = await prisma.user.create({
      data: {
        email,
        name,              // Use 'name' properly here
          password: hashedPassword,
      },
    });

    // Create JWT token
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  });

  // Signin route with Zod validation
  userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Validate the request body using Zod
    const parsed = signinSchema.safeParse(body);
    if (!parsed.success) {
      c.status(400);
      return c.json({ error: "Invalid input", details: parsed.error.errors });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      c.status(403);
      return c.json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  });
