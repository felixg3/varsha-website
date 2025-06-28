#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🔍 Checking Cloudflare access and account information...');
console.log('');

try {
  // Clear environment variables
  delete process.env.CLOUDFLARE_API_TOKEN;
  delete process.env.CLOUDFLARE_API_KEY;
  delete process.env.CLOUDFLARE_EMAIL;

  console.log('📋 Checking current authentication...');
  const whoami = execSync('npx wrangler whoami', { 
    encoding: 'utf8',
    env: { 
      ...process.env,
      CLOUDFLARE_API_TOKEN: undefined,
      CLOUDFLARE_API_KEY: undefined
    }
  });
  console.log(whoami);

  console.log('📊 Listing available accounts...');
  try {
    const accounts = execSync('npx wrangler account list', { 
      encoding: 'utf8',
      env: { 
        ...process.env,
        CLOUDFLARE_API_TOKEN: undefined,
        CLOUDFLARE_API_KEY: undefined
      }
    });
    console.log(accounts);
  } catch (accountError) {
    console.log('⚠️  Could not list accounts. You might need to authenticate first.');
  }

  console.log('🔧 Current wrangler configuration:');
  try {
    const config = execSync('npx wrangler deploy --dry-run', { 
      encoding: 'utf8',
      env: { 
        ...process.env,
        CLOUDFLARE_API_TOKEN: undefined,
        CLOUDFLARE_API_KEY: undefined
      }
    });
    console.log(config);
  } catch (configError) {
    console.log('⚠️  Could not verify configuration:', configError.message);
  }

} catch (error) {
  console.error('❌ Error checking access:', error.message);
  console.log('');
  console.log('🔑 Try running: bun run setup-auth');
  console.log('Or manually run: npx wrangler login');
}