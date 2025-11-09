# 🚀 Aether AI - Dual Deployment Guide

Deploy your Aether AI platform to **both** GitHub Pages (static) and Vercel (full-stack).

---

## 📋 Overview

This project supports **two deployment modes**:

| Platform | Mode | Features | Best For |
|----------|------|----------|----------|
| **GitHub Pages** | Static | Homepage, demo AI (mock), animations | Showcase, landing page |
| **Vercel** | Full-Stack | Real AI, database, auth, file uploads | Production app |

---

## 🌐 Option 1: Deploy to GitHub Pages (Static Showcase)

### What You Get

✅ Beautiful landing page
✅ Animated UI showcase
✅ Demo AI chat (simulated responses)
✅ Fast CDN delivery
✅ Free hosting
✅ Custom domain support

❌ No real AI
❌ No database
❌ No authentication
❌ No file uploads

### Automatic Deployment (Recommended)

**Already configured!** Every push to `main` automatically deploys to GitHub Pages.

1. **Enable GitHub Pages**
   - Go to your repo → Settings → Pages
   - Source: **GitHub Actions**
   - Click **Save**

2. **Push to main**
   ```bash
   git push origin main
   ```

3. **Wait 2-3 minutes**
   - Check Actions tab for build status
   - Visit: `https://yourusername.github.io/ItsAetherAI`

### Manual Deployment

```bash
# Build static site
npm run build:static

# Deploy (creates 'out' folder)
npm run deploy:github

# Manually upload 'out' folder to GitHub Pages
# Or commit and push
```

### Custom Domain Setup

1. **Add CNAME file** (already in workflow)
   ```bash
   echo 'www.itsaether.ai' > out/CNAME
   ```

2. **Configure DNS**
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

3. **Enable in GitHub**
   - Settings → Pages → Custom domain
   - Enter: `www.itsaether.ai`
   - Save (wait for DNS check)

---

## 🎯 Option 2: Deploy to Vercel (Full-Stack App)

### What You Get

✅ Real AI (Google Gemini 2.0 Flash)
✅ PostgreSQL database
✅ User authentication
✅ File uploads (Vercel Blob)
✅ API routes
✅ Speed Insights
✅ Auto-scaling
✅ Serverless functions

### Quick Deploy

#### Method A: Vercel Dashboard (Easiest)

1. **Go to** [vercel.com/new](https://vercel.com/new)

2. **Import Git Repository**
   - Select your GitHub account
   - Choose `ItsAetherAI` repository
   - Click **Import**

3. **Configure (auto-detected)**
   - Framework: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Skip environment variables for now**
   - Click **Deploy**
   - First deployment will fail (expected - needs env vars)

5. **Add Environment Variables**

   Go to: Settings → Environment Variables

   **Required:**
   ```bash
   NEXTAUTH_URL=https://your-project.vercel.app
   NEXTAUTH_SECRET=<run: openssl rand -base64 32>
   GOOGLE_GENAI_API_KEY=<from https://aistudio.google.com/app/apikey>
   ```

   **Optional (Hedera):**
   ```bash
   HEDERA_ACCOUNT_ID=0.0.xxxxx
   HEDERA_PRIVATE_KEY=302e...
   HEDERA_TOPIC_ID=0.0.xxxxx
   ```

6. **Create Postgres Database**
   - Storage tab → Create Database
   - Select **Postgres**
   - Name: `aether-db`
   - Click **Create**
   - Auto-injects `POSTGRES_URL` and related vars

7. **Run Database Schema**
   - Storage → Postgres → Query tab
   - Copy entire contents of `lib/db/schema.sql`
   - Paste and click **Run Query**

8. **Create Blob Storage**
   - Storage tab → Create Database
   - Select **Blob**
   - Name: `aether-blob`
   - Click **Create**
   - Auto-injects `BLOB_READ_WRITE_TOKEN`

9. **Update NEXTAUTH_URL**
   - Copy your deployment URL
   - Settings → Environment Variables
   - Edit `NEXTAUTH_URL` to actual URL
   - Click **Save**

10. **Redeploy**
    - Deployments tab
    - Click **...** on latest
    - Click **Redeploy**

#### Method B: Vercel CLI

```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Post-Deployment Setup

**Test Your Deployment:**

1. **Homepage** → Should load with animations
2. **Sign Up** → Create account
3. **Sign In** → Login works
4. **AI Chat** → Send message, get Gemini response
5. **File Upload** → Visit `/avatar/upload`, upload image
6. **Speed Insights** → Wait 10 min, check dashboard

---

## 🔧 Build Commands Reference

```bash
# Local development
npm run dev                    # http://localhost:9002

# Build for GitHub Pages (static)
npm run build:static          # Creates /out folder

# Build for Vercel (dynamic)
npm run build:vercel          # Creates /.next folder
npm run build                 # Same as build:vercel (default)

# Deploy to GitHub Pages
npm run deploy:github         # Build + prepare /out

# Type checking
npm run typecheck             # Check TypeScript

# Linting
npm run lint                  # ESLint check
```

---

## 🌍 Environment Variables Guide

### For GitHub Pages (Static)

**None required!** Static build works without env vars.

- AI chat shows demo responses
- No authentication needed
- No database calls

### For Vercel (Full-Stack)

**Required:**

| Variable | Where to Get It |
|----------|-----------------|
| `NEXTAUTH_URL` | Your Vercel URL |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `GOOGLE_GENAI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |

**Auto-Injected by Vercel:**

| Variable | Injected When |
|----------|---------------|
| `POSTGRES_URL` | Create Postgres database |
| `BLOB_READ_WRITE_TOKEN` | Create Blob store |

**Optional (Hedera):**

| Variable | Purpose |
|----------|---------|
| `HEDERA_ACCOUNT_ID` | Hedera testnet account |
| `HEDERA_PRIVATE_KEY` | Account private key |
| `HEDERA_TOPIC_ID` | Consensus topic ID |

### Setting Up Env Vars Locally

```bash
# For Vercel development
vercel env pull .env.local

# Or manually create .env.local
cp .env.example .env.local
# Edit with your values
```

---

## 🎨 Visual Enhancements Included

### Advanced Animations

- ✅ Fade in/up/down animations
- ✅ Scale and slide transitions
- ✅ Glassmorphism effects
- ✅ Gradient text effects
- ✅ Glow and shimmer effects
- ✅ Floating elements
- ✅ Morphing blobs
- ✅ Scroll reveal animations

### Loading States

- ✅ Spinner components (3 sizes)
- ✅ Loading dots
- ✅ Skeleton screens
- ✅ Full-page loader
- ✅ Progress bars

### Micro-Interactions

- ✅ Hover lift effects
- ✅ Scale on hover
- ✅ Glow on hover
- ✅ Button press feedback
- ✅ Ripple effects
- ✅ Smooth transitions

### Performance

- ✅ GPU-accelerated animations
- ✅ Reduced motion support
- ✅ Mobile-optimized effects
- ✅ Lazy loading animations

---

## 📊 Comparison: GitHub Pages vs Vercel

| Feature | GitHub Pages | Vercel |
|---------|-------------|---------|
| **Hosting** | Free, unlimited | Free (Hobby), paid plans |
| **Build Time** | 2-3 min | 1-2 min |
| **Custom Domain** | ✅ Free | ✅ Free |
| **SSL/HTTPS** | ✅ Auto | ✅ Auto |
| **CDN** | ✅ Global | ✅ Global + Edge |
| **AI Chat** | ❌ Demo only | ✅ Real Gemini AI |
| **Database** | ❌ No | ✅ Postgres |
| **Authentication** | ❌ No | ✅ NextAuth.js |
| **File Uploads** | ❌ No | ✅ Blob storage |
| **API Routes** | ❌ No | ✅ Serverless |
| **Speed Insights** | ❌ No | ✅ Built-in |
| **Best For** | Showcase | Production |

---

## 🔍 Troubleshooting

### GitHub Pages

**Issue: 404 Not Found**
- Check Actions tab for build errors
- Ensure Pages source is set to "GitHub Actions"
- Wait 5 minutes after deployment

**Issue: Styles not loading**
- Check `out/_next/static` folder exists
- Clear browser cache (Ctrl+Shift+R)
- Check console for errors

**Issue: Links broken**
- Static export converts all routes
- Use `<Link>` from `next/link`
- Check `next.config.ts` has `output: 'export'`

### Vercel

**Issue: Build fails**
- Check environment variables are set
- Run `npm run build:vercel` locally
- Check build logs in Vercel dashboard

**Issue: Database connection error**
- Verify Postgres database is created
- Check `POSTGRES_URL` is set
- Run database schema

**Issue: AI not responding**
- Check `GOOGLE_GENAI_API_KEY` is valid
- Test API key at [AI Studio](https://aistudio.google.com)
- Check function logs in Vercel

**Issue: Authentication fails**
- Verify `NEXTAUTH_URL` matches deployment URL
- Check `NEXTAUTH_SECRET` is set (32+ characters)
- Redeploy after changing env vars

---

## ✅ Pre-Deployment Checklist

### For GitHub Pages

- [ ] Push latest code to `main` branch
- [ ] Enable GitHub Pages in repo settings
- [ ] Set source to "GitHub Actions"
- [ ] Wait for Actions workflow to complete
- [ ] Visit `https://yourusername.github.io/ItsAetherAI`
- [ ] Test homepage loads
- [ ] Test animations work
- [ ] Test demo chat (simulated responses)

### For Vercel

- [ ] Have Google Gemini API key ready
- [ ] Generate `NEXTAUTH_SECRET` (`openssl rand -base64 32`)
- [ ] Deploy to Vercel (dashboard or CLI)
- [ ] Create Postgres database
- [ ] Run database schema SQL
- [ ] Create Blob storage
- [ ] Set all environment variables
- [ ] Update `NEXTAUTH_URL` with deployment URL
- [ ] Redeploy after env var updates
- [ ] Test signup/login
- [ ] Test AI chat (real responses)
- [ ] Test file upload at `/avatar/upload`
- [ ] Wait 10 min, check Speed Insights

---

## 🎓 Which Deployment Should I Use?

### Use **GitHub Pages** if:

- ✅ You want a **free showcase** of the UI
- ✅ You only need a **landing page**
- ✅ You don't need real AI functionality
- ✅ You want **instant deployment** on every push

### Use **Vercel** if:

- ✅ You need **full-stack features**
- ✅ You want **real AI chat**
- ✅ You need **user accounts**
- ✅ You want **database storage**
- ✅ You need **file uploads**
- ✅ You're building a **production app**

### Use **BOTH** if:

- ✅ You want a marketing site (GitHub Pages)
- ✅ Plus a working app (Vercel)
- ✅ Different domains for each
  - `www.itsaether.ai` → GitHub Pages (marketing)
  - `app.itsaether.ai` → Vercel (application)

---

## 🆘 Get Help

- **GitHub Issues**: [Report bugs](https://github.com/yourusername/ItsAetherAI/issues)
- **Vercel Support**: [docs.vercel.com/support](https://vercel.com/support)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)

---

## 🎉 Your Sites Are Live!

**GitHub Pages:** `https://yourusername.github.io/ItsAetherAI`
**Vercel:** `https://your-project.vercel.app`

Enjoy your perfectly tuned, beautifully animated Aether AI platform! 🚀
