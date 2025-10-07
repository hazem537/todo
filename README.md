# Nuxt App with Prisma

A Nuxt application with Prisma ORM and PostgreSQL, deployable to Netlify.

## Features

- 🚀 Nuxt 4 with server API routes
- 🗄️ Prisma ORM with PostgreSQL
- 📦 Todo CRUD API
- ☁️ Netlify deployment ready

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or cloud)

### Local Development

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   
   Create a `.env` file in the root:
   ```env
   NETLIFY_DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   ```

3. **Run Database Migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   Your app will be running at `http://localhost:3000`

## API Endpoints

- `GET /api/test` - Test endpoint
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Deployment to Netlify

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Steps:

1. **Set up PostgreSQL database** (Netlify Postgres, Supabase, Neon, or Railway)

2. **Add environment variable in Netlify:**
   - `NETLIFY_DATABASE_URL` = your PostgreSQL connection string

3. **Run migrations on production database:**
   ```bash
   export NETLIFY_DATABASE_URL="your_production_url"
   npx prisma migrate deploy
   ```

4. **Deploy:**
   ```bash
   git push
   ```
   Or use Netlify CLI:
   ```bash
   netlify deploy --prod
   ```

## Project Structure

```
├── server/
│   └── api/           # API endpoints
│       ├── test.get.ts
│       ├── todos.get.ts
│       ├── todos.post.ts
│       └── todos/
│           ├── [id].put.ts
│           └── [id].delete.ts
├── prisma/
│   └── schema.prisma  # Database schema
├── lib/
│   └── prisma.ts      # Prisma client instance
├── netlify.toml       # Netlify configuration
└── nuxt.config.ts     # Nuxt configuration
```

## Database Schema

```prisma
model Todo {
  id        Int      @id @default(autoincrement())
  text      String
  done      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

## Production Build

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Troubleshooting

See [DEPLOYMENT.md](./DEPLOYMENT.md) for common issues and solutions.

## License

MIT
