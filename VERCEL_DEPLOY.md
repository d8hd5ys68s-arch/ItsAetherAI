# Vercel Deployment Checklist

Follow these steps to deploy Aether AI to Vercel in under 10 minutes.

## ✅ Pre-Deployment Checklist

### 1. Get Your API Keys (5 minutes)

#### Google Gemini API Key (Required - FREE)
1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

#### NextAuth Secret (Required - FREE)
Run this command in your terminal:
```bash
openssl rand -base64 32
```
Copy the output.

#### Hedera Account (Optional - FREE)
1. Go to https://portal.hedera.com/register
2. Create a testnet account
3. Note your Account ID (format: 0.0.xxxxx)
4. Note your Private Key

---

## 🚀 Deployment Steps

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project
1. On Vercel dashboard, click **"Add New... → Project"**
2. Find **"ItsAetherAI"** in the list
3. Click **"Import"**

### Step 3: Configure Project
Vercel will auto-detect Next.js. Just click **"Deploy"** for now.

**Don't worry - it will fail. That's expected!** We need to add the database and environment variables first.

### Step 4: Add Vercel Postgres
1. In your project dashboard, click **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Name it: `aether-ai-db`
5. Select region: Choose closest to you (e.g., `Washington, D.C., USA`)
6. Click **"Create"**

Vercel will automatically inject these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### Step 5: Initialize Database Schema
1. Click on your **Postgres database** (aether-ai-db)
2. Go to **"Query"** tab
3. Open `lib/db/schema.sql` from your GitHub repo
4. Copy the entire SQL content
5. Paste into the Query editor
6. Click **"Run Query"**

You should see: `CREATE TABLE` success messages

### Step 6: Add Environment Variables
1. Go back to your project
2. Click **"Settings"** tab
3. Click **"Environment Variables"**
4. Add these variables:

| Name | Value | Notes |
|------|-------|-------|
| `NEXTAUTH_URL` | `https://your-project.vercel.app` | Replace with your actual Vercel URL |
| `NEXTAUTH_SECRET` | (paste the openssl output) | The base64 string you generated |
| `GOOGLE_GENAI_API_KEY` | (paste your Gemini key) | From Google AI Studio |
| `HEDERA_NETWORK` | `testnet` | Optional - for blockchain features |
| `HEDERA_ACCOUNT_ID` | `0.0.xxxxx` | Optional - your Hedera account |
| `HEDERA_PRIVATE_KEY` | (your Hedera key) | Optional |

**Important:** For each variable, make sure to check:
- ✅ Production
- ✅ Preview
- ✅ Development

Then click **"Save"**

### Step 7: Deploy
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** (or click the 3 dots menu → "Redeploy")
3. Check **"Use existing Build Cache"** (optional)
4. Click **"Redeploy"**

Wait 2-3 minutes for the build to complete.

### Step 8: Update NEXTAUTH_URL
After your first successful deployment:
1. Copy your actual Vercel URL (e.g., `https://aether-ai-xyz.vercel.app`)
2. Go back to **Settings → Environment Variables**
3. Edit `NEXTAUTH_URL` to use your real URL
4. Click **"Save"**
5. Redeploy again

### Step 9: Set Up Hedera Topic (Optional)
If you added Hedera credentials:

1. Visit: `https://your-project.vercel.app/api/hedera/setup`
2. It will return a topic ID
3. Go to **Settings → Environment Variables**
4. Add new variable:
   - Name: `HEDERA_TOPIC_ID`
   - Value: (the topic ID from step 2)
5. Save and redeploy

---

## ✅ Verify Deployment

### Test These Features:

1. **Homepage loads**
   - Visit `https://your-project.vercel.app`
   - Should see the glassmorphic UI

2. **Authentication works**
   - Click "Get Started" or login button
   - Try creating an account
   - Check if you can sign in

3. **AI Chat works**
   - Go to AI Demo section
   - Send a message
   - Should get real AI response from Gemini

4. **Database is connected**
   - Sign in
   - Send a chat message
   - Refresh page - history should persist

5. **Check logs for errors**
   - In Vercel dashboard → **Functions** tab
   - Check for any errors

---

## 🎉 You're Done!

Your app is now live at: `https://your-project.vercel.app`

### Automatic Updates
Every time you push to GitHub, Vercel will automatically:
- Build your app
- Run tests
- Deploy if successful

### Custom Domain (Optional)
Want a custom domain like `aether-ai.com`?
1. Go to **Settings → Domains**
2. Add your domain
3. Follow DNS setup instructions

---

## 🆘 Troubleshooting

### Build Failed
- Check the build logs in Vercel dashboard
- Most common: Missing environment variables
- Solution: Add all required variables and redeploy

### Database Connection Error
- Verify Postgres database is created
- Check if schema.sql was executed
- Ensure `POSTGRES_URL` environment variable exists (should be auto-injected)

### Authentication Not Working
- Verify `NEXTAUTH_URL` matches your actual Vercel URL
- Check `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again

### AI Responses Not Working
- Verify `GOOGLE_GENAI_API_KEY` is correct
- Check API key has not exceeded quota
- Look at function logs for error messages

### Need Help?
- Check SETUP.md for detailed troubleshooting
- Review Vercel function logs
- Check GitHub issues

---

## 📊 Free Tier Limits

Vercel Free Tier includes:
- ✅ Unlimited personal projects
- ✅ 100GB bandwidth per month
- ✅ 100GB-hours serverless function execution
- ✅ Postgres: 256MB storage, 60 hours compute/month

This is MORE than enough for personal projects and testing.

If you exceed limits, Vercel will notify you (not charge automatically).

---

## 🔄 Next Steps After Deployment

1. **Test all features thoroughly**
2. **Monitor usage** in Vercel dashboard
3. **Set up custom domain** (optional)
4. **Enable Hedera tracking** if desired
5. **Share your app!**

Your full-stack AI platform is now live! 🎉
