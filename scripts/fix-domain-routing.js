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

console.log('🔧 Fixing domain routing for varsha.de...');

try {
  const email = config.cf_email[0];
  const apiKey = config.cf_global_api_key[0];
  const accountId = config.cf_account_id[0];
  const zoneId = config.cf_zone_id[0];
  const domain = 'varsha.de';

  const headers = {
    'X-Auth-Email': email,
    'X-Auth-Key': apiKey,
    'Content-Type': 'application/json'
  };

  console.log('🔍 Checking current domain setup...');

  // Check Cloudflare Pages projects
  console.log('\n1️⃣ Checking Cloudflare Pages projects...');
  const pagesResponse = await fetch(`https://api.cloudflare.com/v4/accounts/${accountId}/pages/projects`, {
    headers
  });
  
  const pagesResult = await pagesResponse.json();
  if (pagesResult.success) {
    console.log(`Found ${pagesResult.result.length} Pages projects:`);
    for (const project of pagesResult.result) {
      console.log(`   📄 ${project.name} - ${project.subdomain}.pages.dev`);
      
      if (project.domains && project.domains.length > 0) {
        console.log(`      Custom domains: ${project.domains.join(', ')}`);
        
        // If varsha.de is attached to a Pages project, we need to remove it
        if (project.domains.includes(domain)) {
          console.log(`   ⚠️  Found ${domain} attached to Pages project: ${project.name}`);
          
          // Remove custom domain from Pages
          console.log(`   🗑️  Removing ${domain} from Pages project...`);
          const removeResponse = await fetch(`https://api.cloudflare.com/v4/accounts/${accountId}/pages/projects/${project.name}/domains/${domain}`, {
            method: 'DELETE',
            headers
          });
          
          const removeResult = await removeResponse.json();
          if (removeResult.success) {
            console.log(`   ✅ Successfully removed ${domain} from Pages`);
          } else {
            console.log(`   ❌ Failed to remove domain: ${removeResult.errors?.[0]?.message}`);
          }
        }
      }
    }
  }

  // Check Workers custom domains
  console.log('\n2️⃣ Checking Workers custom domains...');
  const workersDomainsResponse = await fetch(`https://api.cloudflare.com/v4/accounts/${accountId}/workers/domains`, {
    headers
  });
  
  const workersDomainsResult = await workersDomainsResponse.json();
  if (workersDomainsResult.success) {
    console.log(`Found ${workersDomainsResult.result.length} Workers custom domains:`);
    for (const domain_config of workersDomainsResult.result) {
      console.log(`   🔧 ${domain_config.hostname} → ${domain_config.service}`);
    }
    
    const existingDomain = workersDomainsResult.result.find(d => d.hostname === domain);
    if (!existingDomain) {
      console.log(`\n   ➕ Adding ${domain} to Workers...`);
      
      const addDomainResponse = await fetch(`https://api.cloudflare.com/v4/accounts/${accountId}/workers/domains`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          hostname: domain,
          service: 'varsha-website',
          environment: 'production'
        })
      });
      
      const addDomainResult = await addDomainResponse.json();
      if (addDomainResult.success) {
        console.log(`   ✅ Successfully added ${domain} to Workers`);
      } else {
        console.log(`   ❌ Failed to add domain to Workers:`);
        addDomainResult.errors?.forEach(error => {
          console.log(`      ${error.code}: ${error.message}`);
        });
      }
    } else {
      console.log(`   ✅ ${domain} already configured for Workers`);
    }
  }

  // Check DNS records
  console.log('\n3️⃣ Checking DNS records...');
  const dnsResponse = await fetch(`https://api.cloudflare.com/v4/zones/${zoneId}/dns_records?name=${domain}`, {
    headers
  });
  
  const dnsResult = await dnsResponse.json();
  if (dnsResult.success) {
    console.log(`Found ${dnsResult.result.length} DNS records for ${domain}:`);
    for (const record of dnsResult.result) {
      console.log(`   📍 ${record.type} ${record.name} → ${record.content} (${record.proxied ? 'Proxied' : 'DNS Only'})`);
    }
  }

  console.log('\n🧪 Testing domain...');
  
  // Test worker directly
  const workerResponse = await fetch('https://varsha-website.felixg3.workers.dev', { method: 'HEAD' });
  console.log(`   🔧 Worker: ${workerResponse.status} ${workerResponse.statusText}`);
  
  // Test custom domain
  const domainResponse = await fetch(`https://${domain}`, { method: 'HEAD' });
  console.log(`   🌍 ${domain}: ${domainResponse.status} ${domainResponse.statusText}`);
  
  // Get a bit of content to check what's being served
  const contentResponse = await fetch(`https://${domain}`);
  const content = await contentResponse.text();
  
  if (content.includes('main-content')) {
    console.log('   ✅ New Astro site is being served!');
  } else if (content.includes('hero-text')) {
    console.log('   ⚠️  Old static site is still being served');
    console.log('   💡 Try clearing Cloudflare cache or wait a few minutes');
  } else {
    console.log('   ❓ Unknown content being served');
  }

  console.log('\n📋 Summary:');
  console.log('✨ If the new site is not showing yet:');
  console.log('1. Wait 2-5 minutes for changes to propagate');
  console.log('2. Clear Cloudflare cache: https://dash.cloudflare.com');
  console.log('3. Check Workers & Pages dashboard');
  console.log('4. Try hard refresh in browser (Ctrl/Cmd + Shift + R)');

} catch (error) {
  console.error('❌ Error:', error.message);
}