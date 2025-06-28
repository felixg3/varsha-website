#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🔐 Setting up Cloudflare authentication...');
console.log('');
console.log('This will open your browser to authenticate with Cloudflare.');
console.log('Please log in with your Cloudflare account that has access to:');
console.log('- Account ID: 7527200379c7d3d068b06ef8231d9dd3');
console.log('- Domain: varsha.de');
console.log('');

try {
  execSync('npx wrangler login', { stdio: 'inherit' });
  
  console.log('');
  console.log('✅ Authentication successful!');
  console.log('');
  console.log('You can now deploy with: bun run deploy');
  
} catch (error) {
  console.error('❌ Authentication failed:', error.message);
  console.log('');
  console.log('Alternative options:');
  console.log('1. Create an API token at: https://dash.cloudflare.com/profile/api-tokens');
  console.log('2. Update the secrets file with a valid API token');
  console.log('3. Use global API key + email combination');
}