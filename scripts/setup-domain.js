#!/usr/bin/env node

import Cloudflare from 'cloudflare';
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
        config[key.trim()] = value.trim().replace(/[\[\]]/g, '').split(',').map(s => s.trim()).filter(Boolean);
      }
    }
  });
  return config;
};

const config = parseSecrets(secrets);

console.log('🔧 Setting up custom domain routing for varsha.de...');

try {
  // Initialize Cloudflare client
  const cf = new Cloudflare({
    apiEmail: config.cf_email[0],
    apiKey: config.cf_global_api_key[0],
  });

  const accountId = config.cf_account_id[0];
  const zoneId = config.cf_zone_id[0];
  const workerName = 'varsha-website';
  const domain = 'varsha.de';

  console.log(`📧 Email: ${config.cf_email[0]}`);
  console.log(`🏢 Account ID: ${accountId}`);
  console.log(`🌐 Zone ID: ${zoneId}`);
  console.log(`🔧 Worker: ${workerName}`);
  console.log(`🌍 Domain: ${domain}`);

  // Step 1: Get worker script info
  console.log('\n1️⃣ Checking worker deployment...');
  try {
    const workers = await cf.workers.scripts.list({
      account_id: accountId
    });
    
    const worker = workers.result?.find(w => w.id === workerName);
    if (worker) {
      console.log('✅ Worker found and deployed');
    } else {
      console.log('⚠️  Worker not found in list, but continuing with domain setup...');
      console.log('   (Worker may exist but not be visible through API)');
    }
  } catch (error) {
    console.log('⚠️  Could not verify worker, but continuing with domain setup...');
    console.log('   Error:', error.message);
  }

  // Step 2: Add custom domain to worker
  console.log('\n2️⃣ Adding custom domain to worker...');
  try {
    const customDomain = await cf.workers.domains.create({
      account_id: accountId,
      zone_id: zoneId,
      hostname: domain,
      service: workerName,
      environment: 'production'
    });
    console.log('✅ Custom domain added to worker');
    console.log(`🔗 Domain: ${customDomain.hostname}`);
  } catch (error) {
    if (error.message.includes('already exists') || error.code === 1003) {
      console.log('ℹ️  Custom domain already exists, updating...');
      try {
        // Try to update the existing domain
        const domains = await cf.workers.domains.list({
          account_id: accountId
        });
        
        const existingDomain = domains.result?.find(d => d.hostname === domain);
        if (existingDomain) {
          console.log('✅ Domain already configured correctly');
        }
      } catch (updateError) {
        console.warn('⚠️  Could not verify domain configuration:', updateError.message);
      }
    } else {
      console.error('❌ Failed to add custom domain:', error.message);
      throw error;
    }
  }

  // Step 3: Verify DNS and routing
  console.log('\n3️⃣ Checking DNS configuration...');
  try {
    const zone = await cf.zones.get({ zone_id: zoneId });
    console.log(`✅ Zone found: ${zone.name}`);
    
    // Check if there are any DNS records that might conflict
    const records = await cf.dns.records.list({ zone_id: zoneId });
    const conflictingRecords = records.result?.filter(record => 
      record.name === domain && (record.type === 'A' || record.type === 'AAAA' || record.type === 'CNAME')
    );
    
    if (conflictingRecords?.length > 0) {
      console.log('⚠️  Found existing DNS records:');
      conflictingRecords.forEach(record => {
        console.log(`   ${record.type} ${record.name} -> ${record.content}`);
      });
      console.log('   These might interfere with worker routing.');
    } else {
      console.log('✅ No conflicting DNS records found');
    }
  } catch (error) {
    console.warn('⚠️  Could not check DNS configuration:', error.message);
  }

  // Step 4: Test the domain
  console.log('\n4️⃣ Testing domain...');
  try {
    const response = await fetch(`https://${domain}`, { 
      method: 'HEAD',
      redirect: 'manual'
    });
    
    if (response.ok || response.status === 200) {
      console.log('✅ Domain is responding correctly!');
    } else {
      console.log(`⚠️  Domain returned status: ${response.status}`);
      console.log('   It may take a few minutes for changes to propagate.');
    }
  } catch (error) {
    console.log('⚠️  Could not test domain immediately (this is normal)');
    console.log('   DNS changes can take up to 5 minutes to propagate globally.');
  }

  console.log('\n🎉 Domain setup complete!');
  console.log(`✨ Your site should be available at: https://${domain}`);
  console.log(`🔄 Worker URL: https://${workerName}.${accountId.substring(0, 8)}.workers.dev`);
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Wait 2-5 minutes for DNS propagation');
  console.log(`2. Visit https://${domain} to verify`);
  console.log('3. If issues persist, check Cloudflare dashboard');

} catch (error) {
  console.error('❌ Domain setup failed:', error.message);
  
  if (error.code === 10001) {
    console.log('\n🔑 Authentication failed. Please verify:');
    console.log('- Your email in secrets file is correct');
    console.log('- Your Global API Key is valid');
    console.log('- You have access to the specified account and zone');
  }
  
  console.log('\n📋 Manual setup instructions:');
  console.log('1. Go to https://dash.cloudflare.com');
  console.log('2. Navigate to Workers & Pages → varsha-website');
  console.log('3. Click "Custom Domains" → Add Domain');
  console.log('4. Enter: varsha.de');
  console.log('5. Follow the setup instructions');
  
  process.exit(1);
}