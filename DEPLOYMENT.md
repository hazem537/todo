# Deploying to Netlify

This guide will help you deploy your Nuxt app with Prisma to Netlify.

## Prerequisites

1. A Netlify account
2. A PostgreSQL database (use Netlify Postgres or another provider like Supabase, Neon, or Railway)

## Steps to Deploy

### 1. Set Up PostgreSQL Database

You have two options:

#### Option A: Netlify Postgres (Recommended)
1. Go to your Netlify site dashboard
2. Navigate to "Integrations" → "Add-ons"
3. Install "Netlify Postgres"
4. The `NETLIFY_DATABASE_URL` environment variable will be automatically added

#### Option B: External PostgreSQL Provider
1. Create a PostgreSQL database on your preferred provider:
   - [Supabase](https://supabase.com/) (Free tier available)
   - [Neon](https://neon.tech/) (Free tier available)
   - [Railway](https://railway.app/) (Free tier available)
2. Get your connection string (should look like: `postgresql://user:password@host:port/database`)

### 2. Configure Environment Variables in Netlify

1. Go to your Netlify site dashboard
2. Navigate to "Site configuration" → "Environment variables"
3. Add the following variable if not using Netlify Postgres:
   ```
   NETLIFY_DATABASE_URL = your_postgresql_connection_string
   ```

### 3. Run Database Migrations

You need to run migrations before deploying. You can do this in two ways:

#### Option A: Run Locally Before Deploying
```bash
# Set your production database URL
export NETLIFY_DATABASE_URL="your_production_database_url"

# Run migrations
npx prisma migrate deploy
```

#### Option B: Add to Build Command in Netlify
Update your `netlify.toml` build command:
```toml
[build]
  command = "prisma migrate deploy && npm run build"
```

### 4. Deploy to Netlify

#### First Time Deployment:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
```

#### Subsequent Deployments:
Just push to your connected Git repository, or run:
```bash
netlify deploy --prod
```

### 5. Verify Deployment

After deployment, test your API endpoints:
- Test endpoint: `https://your-site.netlify.app/api/test`
- Get todos: `https://your-site.netlify.app/api/todos`
- Create todo: POST to `https://your-site.netlify.app/api/todos`

## Troubleshooting

### Backend API Returns 500 Error
- Check that `NETLIFY_DATABASE_URL` environment variable is set correctly
- Verify database migrations have been run
- Check Netlify function logs for detailed error messages

### Prisma Client Not Found
- Make sure `prisma generate` runs during build (it's in the build script)
- Check that `@prisma/client` and `prisma` are properly listed in dependencies

### Database Connection Issues
- Ensure your database URL includes `?sslmode=require` for secure connections
- Verify database is accessible from external connections
- Check firewall rules if using a self-hosted database

### Build Fails
- Check Node version is set to 20 in `netlify.toml`
- Verify all dependencies are installed
- Review build logs in Netlify dashboard

## Local Development

For local development:

1. Copy `.env.example` to `.env`
2. Update `NETLIFY_DATABASE_URL` with your local or development database URL
3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```

## Database Schema Changes

When you make changes to your Prisma schema:

1. Create a migration:
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```

2. Deploy to production:
   ```bash
   # Set production database URL
   export NETLIFY_DATABASE_URL="your_production_database_url"
   
   # Deploy migration
   npx prisma migrate deploy
   ```

3. Push your code to trigger a new deployment

## Additional Resources

- [Nuxt Deployment Documentation](https://nuxt.com/docs/getting-started/deployment)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Prisma Deployment Documentation](https://www.prisma.io/docs/guides/deployment)

