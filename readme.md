# 🧠 Neuronote

Neuronote is a fullstack note-taking application built with **Hono.js** on the backend and **React** on the frontend. It's designed for simplicity, speed, and cloud-friendly deployment.

## 📦 Tech Stack

### Backend (Hono.js)
- ⚡️ [Hono.js](https://hono.dev/) – ultra-fast web framework for Cloudflare Workers and other edge runtimes.
- 🧬 [Prisma + Accelerate](https://www.prisma.io/accelerate) – type-safe database access with Accelerate for edge optimization.
- 🌐 Cloudflare Workers (or Node.js-compatible edge runtime)
- 🗄️ PostgreSQL

### Frontend (React)
- ⚛️ [React](https://reactjs.org/)
- 🎨 Tailwind CSS (for UI)
- 📦 Vite (for fast development build)

## 🚀 Features

- 🔐 Auth system (signup / signin)
- 📝 Create, read, update, delete notes
- 🔍 View individual notes
- 📁 Organized by tags (coming soon)
- 🌙 Dark mode toggle (coming soon)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/neuronote.git
cd neuronote
2. Setup Backend
bash
Copy
Edit
cd backend
pnpm install
Setup .env:

env
Copy
Edit
DATABASE_URL=your_postgres_url
Deploy Prisma schema:

bash
Copy
Edit
pnpm prisma migrate dev
Run the dev server:

bash
Copy
Edit
pnpm dev
3. Setup Frontend
bash
Copy
Edit
cd frontend
pnpm install
pnpm dev
🌍 Deployment
Backend can be deployed to Cloudflare Workers, Vercel Edge Functions, or Deno Deploy.

Frontend can be deployed to Vercel, Netlify, or Cloudflare Pages.

🤝 Contributing
Contributions are welcome! Fork the repo, create a feature branch, and open a PR 🚀