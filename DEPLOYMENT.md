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

You need to run migrations before deploying:

```bash
# Set your production database URL
export NETLIFY_DATABASE_URL="your_production_database_url"

# Run migrations
npx prisma migrate deploy
```

**Important:** Run migrations BEFORE your first deployment. You cannot run migrations automatically during Netlify build as the database needs to be set up first.

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

### "Page Not Found" / 404 Error on Deployed Site
This is the most common issue. Solutions:

1. **Clear Netlify Cache and Redeploy:**
   - Go to Netlify dashboard → Deploys
   - Click "Trigger deploy" → "Clear cache and deploy site"

2. **Verify Build Output:**
   - Check that `.output/public` directory exists after build
   - Ensure build completes successfully without errors

3. **Check `netlify.toml` Configuration:**
   - Make sure `publish = ".output/public"` (NOT `dist`)
   - Verify redirect is pointing to `/.netlify/builders/server`

4. **Ensure Environment Variables Are Set:**
   - Go to Site Settings → Environment Variables
   - Verify `NETLIFY_DATABASE_URL` is set

### Backend API Returns 500 Error
- Check that `NETLIFY_DATABASE_URL` environment variable is set correctly
- Verify database migrations have been run: `npx prisma migrate deploy`
- Check Netlify function logs: Site → Functions → View logs
- Test database connection string locally first

### Prisma Client Not Found
- Make sure `prisma generate` runs during build (it's in the build script)
- Check that `@prisma/client` and `prisma` are properly listed in dependencies
- Clear cache and redeploy

### Database Connection Issues
- Ensure your database URL includes `?sslmode=require` for secure connections
- Verify database is accessible from external connections (check IP allowlisting)
- Check firewall rules if using a self-hosted database
- Test the connection string with `npx prisma db pull` locally

### Build Fails
- Check Node version is set to 20 in `netlify.toml`
- Verify all dependencies are installed
- Review build logs in Netlify dashboard
- Ensure `prisma generate` completes successfully
- Check for TypeScript errors

### Functions Not Working
- Check Netlify Functions logs for errors
- Verify `@prisma/client` is in `external_node_modules` in `netlify.toml`
- Ensure your API routes are in `server/api/` directory
- Test endpoints locally with `npm run build && npm run preview`

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

