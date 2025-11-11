# Build Fix Guide

## Issue

If you see permission errors when building:

```
Error: EACCES: permission denied, unlink '/home/daddyai/ItsAetherAI/.next/diagnostics/build-diagnostics.json'
```

This happens when the `.next` directory has files owned by root (from running `sudo npm run build`).

## Quick Fix

Run the cleanup script with sudo:

```bash
sudo bash clean-build.sh
```

Then build normally (without sudo):

```bash
npm run build:static
npm run deploy:github
```

## Why This Happens

- The `.next` directory gets created with root permissions when you run `sudo npm run build`
- Next.js can't clean/overwrite these files without sudo
- The solution is to clean the directory and never use sudo for npm commands

## Alternative Fix (Manual)

If you prefer to do it manually:

```bash
# Clean with sudo
sudo rm -rf .next out

# Change ownership back to your user
sudo chown -R $USER:$USER .

# Build normally
npm run build:static
npm run deploy:github
```

## What Gets Excluded from Static Build

The build script automatically excludes these Vercel-specific features:

1. **API routes** (`app/api/*`) - Temporarily moved during build
2. **Avatar upload** (`app/avatar/*`) - Requires Vercel Blob storage

These features only work on Vercel deployment, not static GitHub Pages.

## Static vs Dynamic Build

### Static Build (GitHub Pages)
```bash
npm run build:static      # Creates static HTML in /out
npm run deploy:github     # Deploys to GitHub Pages
```

**What works:**
- Landing page with animations
- All UI components
- Client-side routing

**What doesn't work:**
- API routes (no server)
- Avatar uploads (requires Vercel Blob)
- Server-side authentication
- Database queries

### Dynamic Build (Vercel)
```bash
npm run build            # Full dynamic build
vercel deploy --prod     # Deploy to Vercel
```

**Everything works:**
- All features including APIs
- Avatar uploads via Vercel Blob
- Server-side rendering
- Database integration
- Real-time AI chat

## Recommended Deployment

For the full experience with all features, deploy to Vercel:

```bash
vercel deploy --prod
```

For just the landing page showcase, use GitHub Pages:

```bash
sudo bash clean-build.sh  # If needed
npm run deploy:github
```
