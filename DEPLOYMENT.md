# Deployment Troubleshooting Guide

## Current Issue: Authentication Error (Code 10001)

This error was caused by confusion between Global API Key and API Token:

- **Global API Key**: Requires email + key (what we have: `49b6cea38ef2f8b06bc9d3ea50dd5a437c720`)
- **API Token**: Self-contained token that doesn't need email

## Required for Global API Key Authentication:
1. Your Cloudflare account email
2. The Global API Key: `49b6cea38ef2f8b06bc9d3ea50dd5a437c720`
3. Account ID: `7527200379c7d3d068b06ef8231d9dd3`

## Step-by-Step Fix

### Step 1: Add Email to Secrets File
Add your Cloudflare account email to the `secrets` file:

```
cf_global_api_key=49b6cea38ef2f8b06bc9d3ea50dd5a437c720
cf_account_id=7527200379c7d3d068b06ef8231d9dd3
cf_zone_id=b3a69d4ac1be5258c224ca8e21f5d052
cf_email=your-email@example.com
current_domains=[varsha-website.pages.dev, varsha.de]
```

### Step 2: Deploy with Global API Key
```bash
bun run deploy
```
This will now use the Global API Key + email authentication method.

### Step 3: Alternative - Environment Variables
You can also set environment variables:
```bash
export CLOUDFLARE_EMAIL="your-email@example.com"
export CLOUDFLARE_API_KEY="49b6cea38ef2f8b06bc9d3ea50dd5a437c720"
bun run deploy:simple
```

### Step 4: If Successful, Configure Custom Domain
Once the worker is deployed successfully:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Find your account with access to `varsha.de`
3. Go to Workers & Pages → varsha-website
4. Add custom domain: `varsha.de`

## Alternative: Manual Deployment

If automated scripts fail:

```bash
# 1. Build the project
bun run build

# 2. Login to Cloudflare
npx wrangler login

# 3. Check what accounts you have
npx wrangler whoami

# 4. Deploy to your available account
npx wrangler deploy

# 5. The worker will be available at:
# https://varsha-website.YOUR-ACCOUNT.workers.dev
```

## Account ID Issues

The hardcoded account ID `7527200379c7d3d068b06ef8231d9dd3` might not be accessible to your Cloudflare login.

**Solutions:**
1. Use a different Cloudflare account that has `varsha.de`
2. Get proper access to the existing account
3. Deploy to your own account first, then transfer domain later

## Next Steps After Successful Deployment

1. Worker will be live at `https://varsha-website.YOUR-ACCOUNT.workers.dev`
2. Configure custom domain routing in Cloudflare dashboard
3. Set up `varsha.de` to point to the worker
4. Test the live site

## Getting Help

If you continue having issues:
1. Run `bun run check-access` and share the output
2. Verify you have access to the Cloudflare account with `varsha.de`
3. Consider creating a new Cloudflare account if needed