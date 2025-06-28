# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional portfolio website for Varsha Iyer, a multilingual conference interpreter and EU affairs specialist. The site is built with Astro.js and deployed to Cloudflare Workers for optimal performance and global distribution.

## Architecture

**Framework**: Astro.js v5 with @astrojs/cloudflare adapter
**Deployment**: Cloudflare Workers with automatic deployment via API
**Styling**: Modern CSS with CSS Grid, Flexbox, and custom properties
**Images**: Optimized assets in `/public/assets/` directory

### Key Directories
- `src/pages/`: Astro pages (main entry point: `index.astro`)
- `src/components/`: Reusable Astro components
- `src/layouts/`: Layout templates
- `public/assets/`: Static assets (images, backgrounds)
- `public/pdfs/`: Professional documents for download
- `scripts/`: Deployment and utility scripts

## Development Commands

```bash
bun run dev         # Start development server (localhost:4321)
bun run build       # Build for production
bun run preview     # Preview production build
bun run setup-auth  # Set up Cloudflare authentication (run first)
bun run deploy      # Build and deploy to Cloudflare Workers
bun run deploy:simple # Alternative simple deployment method
```

## Key Features

- **Professional Design**: Beautiful, modern portfolio template optimized for high-level professionals
- **Responsive Layout**: Mobile-first design with sophisticated breakpoints
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Performance Optimized**: Server-side rendering with edge deployment
- **SEO Ready**: Proper meta tags, structured data, and performance optimization

## Content Structure

The website showcases Varsha's professional excellence through:
- **Hero Section**: Professional portrait with key credentials (Blue Book Alumna, NRW Scholar)
- **About**: Executive summary of expertise and achievements
- **Skills**: Three core competencies with professional descriptions
- **Experience Timeline**: Chronological professional experience with key achievements
- **Education Grid**: Academic credentials and awards
- **Languages**: Five-language proficiency showcase
- **Contact CTA**: Professional contact information and CV download

## Styling Conventions

- **Design System**: Uses sophisticated color palette and typography scale
- **Components**: Modular, reusable Astro components
- **Backgrounds**: Layered background system with noise textures
- **Typography**: Professional hierarchy with Inter font family
- **Colors**: Professional palette suitable for EU/government context

## Deployment

The site automatically deploys to Cloudflare Workers using:
1. Cloudflare API credentials from `secrets` file
2. Automated build process via `scripts/deploy.js`
3. Custom domain routing (varsha.de)
4. Global edge distribution for optimal performance

**Environment Setup**: All secrets are managed via the `secrets` file
**API Configuration**: Uses Cloudflare global API key for full deployment automation
**Domain**: Primary domain is varsha.de with automatic routing setup

## Deployment Setup

### First Time Setup
1. Run `bun run setup-auth` to authenticate with Cloudflare
2. This will open your browser for OAuth authentication
3. Log in with the Cloudflare account that has access to varsha.de
4. Once authenticated, run `bun run deploy`

### Alternative Authentication Methods
If the `secrets` file authentication fails:

1. **Interactive Login**: `bun run setup-auth`
2. **API Token**: Create at https://dash.cloudflare.com/profile/api-tokens
   - Use "Custom token" template
   - Permissions: Zone:Read, Worker:Edit, Account:Read
   - Account: Include the account with ID `7527200379c7d3d068b06ef8231d9dd3`
   - Zone: Include `varsha.de`
3. **Simple Deploy**: `bun run deploy:simple` (requires prior auth)

### Troubleshooting

For detailed troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md)

**Quick Fixes:**
- **Authentication Error Code 10001**: Run `bun run reset-auth` then `bun run deploy:simple`
- **Account Access Issues**: Run `bun run check-access` to verify permissions
- **Domain Issues**: Deploy to workers.dev first, configure custom domain later

**Emergency Deployment:**
```bash
bun run reset-auth     # Clear auth cache
bun run check-access   # Verify account access  
bun run deploy:simple  # Deploy to available account
```