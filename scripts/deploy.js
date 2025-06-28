#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Read secrets
const secretsPath = join(projectRoot, 'secrets');
const secrets = readFileSync(secretsPath, 'utf8');

const parseSecrets = (content) => {
  const config = {};
  content.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        config[key.trim()] = value.trim().replace(/[\[\]]/g, '').split(',').map(s => s.trim());
      }
    }
  });
  return config;
};

const config = parseSecrets(secrets);

console.log('🚀 Starting Cloudflare Workers deployment...');

try {
  // Check if we have the required credentials
  const apiKey = config.cf_global_api_key?.[0];
  const accountId = config.cf_account_id?.[0];
  const email = config.cf_email?.[0];
  
  if (!apiKey || !accountId) {
    throw new Error('Missing required Cloudflare credentials in secrets file');
  }

  if (!email) {
    console.log('⚠️  Cloudflare email not found in secrets file.');
    console.log('Please add your Cloudflare account email to the secrets file:');
    console.log('cf_email=your-email@example.com');
    console.log('');
    console.log('The Global API Key requires both your email and the API key for authentication.');
    throw new Error('Email required for Global API Key authentication');
  }

  console.log(`🔑 Using Global API Key for account: ${accountId}`);
  console.log(`📧 Email: ${email}`);
  console.log(`🔐 API Key: ${apiKey.substring(0, 8)}...`);  // Show only first 8 chars for security

  console.log('📦 Building Astro project...');
  execSync('bun run build', { cwd: projectRoot, stdio: 'inherit' });

  console.log('☁️ Deploying to Cloudflare Workers using Global API Key...');
  
  // Set environment variables for Global API Key authentication
  const deployEnv = {
    ...process.env,
    CLOUDFLARE_API_KEY: apiKey,
    CLOUDFLARE_EMAIL: email,
    CLOUDFLARE_ACCOUNT_ID: accountId,
    // Clear API token to avoid conflicts
    CLOUDFLARE_API_TOKEN: undefined
  };
  
  execSync('npx wrangler deploy', { 
    cwd: projectRoot, 
    stdio: 'inherit',
    env: deployEnv
  });

  console.log('🎉 Deployment successful!');
  console.log(`✨ Your site is now live at: https://varsha.de`);
  console.log(`📄 Worker deployed to: https://varsha-website.${config.cf_account_id[0]}.workers.dev`);

  // Optionally set up custom domain routing
  console.log('🔗 Setting up custom domain routing...');
  try {
    // This would require additional Cloudflare API calls to set up domain routing
    // For now, we'll just log that manual configuration may be needed
    console.log('ℹ️  Manual domain configuration may be required in Cloudflare dashboard');
    console.log('   Navigate to your Cloudflare dashboard and configure custom domain routing');
  } catch (domainError) {
    console.warn('⚠️  Custom domain setup requires manual configuration');
  }

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}