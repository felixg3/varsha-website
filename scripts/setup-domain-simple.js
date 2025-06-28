#!/usr/bin/env node

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

console.log('🔧 Setting up custom domain routing for varsha.de via REST API...');

try {
  const email = config.cf_email[0];
  const apiKey = config.cf_global_api_key[0];
  const accountId = config.cf_account_id[0];
  const zoneId = config.cf_zone_id[0];
  const workerName = 'varsha-website';
  const domain = 'varsha.de';

  console.log(`📧 Email: ${email}`);
  console.log(`🏢 Account ID: ${accountId}`);
  console.log(`🌐 Zone ID: ${zoneId}`);
  console.log(`🔧 Worker: ${workerName}`);
  console.log(`🌍 Domain: ${domain}`);

  const headers = {
    'X-Auth-Email': email,
    'X-Auth-Key': apiKey,
    'Content-Type': 'application/json'
  };

  // Step 1: Add custom domain to worker
  console.log('\n1️⃣ Adding custom domain to worker...');
  
  const domainPayload = {
    hostname: domain,
    service: workerName,
    environment: 'production'
  };

  const domainResponse = await fetch(`https://api.cloudflare.com/v4/accounts/${accountId}/workers/domains`, {
    method: 'POST',
    headers,
    body: JSON.stringify(domainPayload)
  });

  const domainResult = await domainResponse.json();

  if (domainResult.success) {
    console.log('✅ Custom domain added successfully!');
    console.log(`🔗 Domain: ${domainResult.result.hostname}`);
    console.log(`📍 Worker: ${domainResult.result.service}`);
  } else if (domainResult.errors?.some(e => e.code === 1003)) {
    console.log('ℹ️  Custom domain already exists');
    
    // Get existing domains to verify
    const getDomainsResponse = await fetch(`https://api.cloudflare.com/v4/accounts/${accountId}/workers/domains`, {
      headers
    });
    
    const getDomainsResult = await getDomainsResponse.json();
    if (getDomainsResult.success) {
      const existingDomain = getDomainsResult.result.find(d => d.hostname === domain);
      if (existingDomain) {
        console.log('✅ Domain already configured correctly');
        console.log(`🔗 Domain: ${existingDomain.hostname} → ${existingDomain.service}`);
      }
    }
  } else {
    console.error('❌ Failed to add custom domain:');
    domainResult.errors?.forEach(error => {
      console.error(`   ${error.code}: ${error.message}`);
    });
  }

  // Step 2: Create DNS record if needed
  console.log('\n2️⃣ Checking DNS configuration...');
  
  const dnsResponse = await fetch(`https://api.cloudflare.com/v4/zones/${zoneId}/dns_records?name=${domain}`, {
    headers
  });
  
  const dnsResult = await dnsResponse.json();
  
  if (dnsResult.success) {
    const existingRecords = dnsResult.result.filter(r => 
      r.name === domain && (r.type === 'A' || r.type === 'AAAA' || r.type === 'CNAME')
    );
    
    if (existingRecords.length > 0) {
      console.log('ℹ️  Found existing DNS records:');
      existingRecords.forEach(record => {
        console.log(`   ${record.type} ${record.name} → ${record.content}`);
      });
      console.log('   Worker routing will take precedence for configured routes.');
    } else {
      console.log('✅ No conflicting DNS records found');
    }
  }

  // Step 3: Test the domain
  console.log('\n3️⃣ Testing domain...');
  try {
    const testResponse = await fetch(`https://${domain}`, { 
      method: 'HEAD',
      redirect: 'manual'
    });
    
    if (testResponse.ok) {
      console.log('✅ Domain is responding correctly!');
    } else {
      console.log(`⚠️  Domain returned status: ${testResponse.status}`);
      console.log('   Changes may take a few minutes to propagate.');
    }
  } catch (error) {
    console.log('⚠️  Could not test domain immediately');
    console.log('   DNS propagation can take up to 5 minutes.');
  }

  console.log('\n🎉 Domain setup complete!');
  console.log(`✨ Your site should be available at: https://${domain}`);
  console.log(`🔄 Worker URL: https://${workerName}.felixg3.workers.dev`);
  console.log('');
  console.log('📝 If the domain doesn\'t work immediately:');
  console.log('1. Wait 2-5 minutes for DNS propagation');
  console.log('2. Check Cloudflare dashboard: Workers & Pages → varsha-website → Custom Domains');
  console.log('3. Verify zone settings in Cloudflare DNS tab');

} catch (error) {
  console.error('❌ Domain setup failed:', error.message);
  
  console.log('\n📋 Manual setup instructions:');
  console.log('1. Go to https://dash.cloudflare.com');
  console.log('2. Navigate to Workers & Pages → varsha-website');
  console.log('3. Click "Custom Domains" → Add Domain');
  console.log('4. Enter: varsha.de');
  console.log('5. Follow the setup instructions');
  
  process.exit(1);
}