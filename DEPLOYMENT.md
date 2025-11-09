# GitHub Pages Deployment Guide

This document provides detailed information about deploying the Aether AI application to GitHub Pages.

## Overview

The Aether AI web application is built with:
- **React 19** + **TypeScript** (TSX)
- **Vite** for building and bundling
- **GitHub Pages** for hosting with custom domain (`www.itsaether.ai`)

## Build Configuration

### Vite Configuration (`vite.config.ts`)

```typescript
export default defineConfig({
  base: './',  // Important for custom domain on GitHub Pages
  // ... other config
});
```

**Why `base: './'`?**
- Ensures asset paths are relative (`./assets/index-*.js`)
- Works correctly with custom domains on GitHub Pages
- Prevents 404 errors on CSS/JS files

### Build Output

The build process:
1. Compiles TypeScript/TSX → JavaScript
2. Bundles React components → Optimized JS chunks
3. Processes CSS → Minified CSS files
4. Outputs to `dist/` folder

**Build Command:**
```bash
npm run build
```

**Output Structure:**
```
dist/
├── index.html           # Entry point (references compiled assets)
├── assets/
│   ├── index-*.js      # Compiled JavaScript bundle
│   └── index-*.css     # Compiled CSS bundle
└── CNAME               # Custom domain configuration
```

## Automated Deployment

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

The deployment is fully automated via GitHub Actions:

```yaml
on:
  push:
    branches:
      - main  # Triggers on push to main branch
  workflow_dispatch:  # Manual trigger option
```

**Workflow Steps:**
1. **Checkout** - Clone the repository
2. **Setup Node** - Install Node.js 20
3. **Install dependencies** - Run `npm ci`
4. **Build** - Run `npm run build` (compiles TSX → JS)
5. **Verify build** - Run `npm run verify-build` (checks output)
6. **Copy CNAME** - Ensure custom domain is preserved
7. **Upload artifact** - Prepare `dist/` for deployment
8. **Deploy** - Deploy to GitHub Pages

### What Gets Deployed?

✅ **Deployed to GitHub Pages:**
- `dist/` folder contents (compiled assets)
- `index.html` (referencing compiled JS/CSS)
- `assets/` folder (`.js` and `.css` files)
- `CNAME` file (custom domain)

❌ **NOT Deployed:**
- `src/` folder (raw TSX/TS files)
- `node_modules/` (dependencies)
- Development files (`.env`, config files, etc.)

## Manual Deployment

If you need to manually verify or deploy:

### 1. Build the Application

```bash
npm run build
```

### 2. Verify Build Output

```bash
npm run verify-build
```

This script checks:
- ✅ `dist/` folder exists
- ✅ `index.html` exists and is correct
- ✅ No `.tsx` file references (should be `.js`)
- ✅ No `/src/` path references (should be `./assets/`)
- ✅ JavaScript and CSS files are present

**Expected Output:**
```
✅ Build verification passed!

📊 Build output summary:
   - index.html: ✅ Found
   - JavaScript files: ✅ 1 file(s)
   - CSS files: ✅ 1 file(s)
   - No .tsx references: ✅ Clean
   - Asset paths: ✅ Using ./assets/

🚀 Build is ready for GitHub Pages deployment!
```

### 3. Preview Locally

```bash
npm run preview
```

This starts a local server serving the `dist/` folder, simulating the GitHub Pages environment.

## Troubleshooting

### MIME Type Errors

**Symptom:** Console shows errors like:
```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html"
```

**Cause:** Browser is trying to load `.tsx` files instead of compiled `.js` files.

**Solution:**
1. Verify build output: `npm run verify-build`
2. Check that `dist/index.html` references `./assets/index-*.js` (not `/src/main.tsx`)
3. Clear browser cache (Ctrl+Shift+R)
4. Verify GitHub Pages is serving from `dist/` folder (via GitHub Actions)

### 404 Errors on Assets

**Symptom:** CSS/JS files return 404 errors.

**Causes & Solutions:**

1. **Wrong base path:**
   - Check `vite.config.ts` has `base: './'`
   - Rebuild after changing config

2. **Wrong deployment folder:**
   - Verify GitHub Actions deploys `dist/` folder
   - Check `.github/workflows/deploy.yml`

3. **Browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or use incognito/private mode

### GitHub Pages Shows Old Version

**Cause:** GitHub Pages caching or deployment delay.

**Solution:**
1. Wait 2-5 minutes for deployment to complete
2. Check GitHub Actions workflow completed successfully
3. Clear browser cache
4. Verify workflow deployed correct files

## Verification Checklist

Before considering deployment successful:

- [ ] Build completes without errors: `npm run build`
- [ ] Verification passes: `npm run verify-build`
- [ ] GitHub Actions workflow completed successfully
- [ ] Site loads at `https://www.itsaether.ai`
- [ ] No 404 errors in browser console
- [ ] No MIME type errors in browser console
- [ ] Assets load correctly (check Network tab)
- [ ] Custom domain is working (CNAME file deployed)

## GitHub Pages Settings

Ensure your GitHub Pages settings are correct:

1. Go to repository Settings → Pages
2. **Source:** GitHub Actions (not branch)
3. **Custom domain:** `www.itsaether.ai`
4. **Enforce HTTPS:** ✅ Enabled

## Development vs Production

### Development (`npm run dev`)
- Serves raw TSX files via Vite dev server
- Hot module replacement enabled
- TypeScript checked in real-time
- Uses `/src/main.tsx` directly

### Production (`npm run build`)
- Compiles TSX → JS
- Minifies and optimizes code
- Outputs to `dist/` folder
- Uses `./assets/index-*.js`

**Important:** Never deploy the `src/` folder to GitHub Pages. Always deploy the built `dist/` folder.

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Documentation](https://react.dev/)

## Support

If you encounter issues not covered here:
1. Check GitHub Actions logs for build errors
2. Run `npm run verify-build` to check build output
3. Open browser DevTools → Console and Network tabs
4. Review this guide's Troubleshooting section
