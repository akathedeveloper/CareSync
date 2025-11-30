#!/usr/bin/env node

/**
 * PWA Validation Script for CareSync
 * 
 * This script validates the PWA manifest and favicon system
 * to ensure all components are properly configured.
 * 
 * Usage: node scripts/validate-pwa.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'manifest.json');
const BROWSERCONFIG_PATH = path.join(PUBLIC_DIR, 'browserconfig.xml');

// Required favicon files
const REQUIRED_FAVICONS = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'favicon-72x72.png',
  'favicon-96x96.png',
  'favicon-128x128.png',
  'favicon-144x144.png',
  'favicon-152x152.png',
  'favicon-192x192.png',
  'favicon-384x384.png',
  'favicon-512x512.png',
  'apple-touch-icon-57x57.png',
  'apple-touch-icon-60x60.png',
  'apple-touch-icon-72x72.png',
  'apple-touch-icon-76x76.png',
  'apple-touch-icon-114x114.png',
  'apple-touch-icon-120x120.png',
  'apple-touch-icon-144x144.png',
  'apple-touch-icon-152x152.png',
  'apple-touch-icon-180x180.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'mstile-70x70.png',
  'mstile-144x144.png',
  'mstile-150x150.png',
  'mstile-310x150.png',
  'mstile-310x310.png',
  'favicon-192x192-maskable.png',
  'favicon-512x512-maskable.png'
];

// Required manifest properties
const REQUIRED_MANIFEST_PROPERTIES = [
  'name',
  'short_name',
  'description',
  'start_url',
  'display',
  'background_color',
  'theme_color',
  'icons'
];

// Required icon properties
const REQUIRED_ICON_PROPERTIES = ['src', 'sizes', 'type'];

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description}: Found`);
    return true;
  } else {
    console.log(`❌ ${description}: Missing`);
    return false;
  }
}

function validateManifest() {
  console.log('\n📋 Validating PWA Manifest...');
  
  if (!checkFileExists(MANIFEST_PATH, 'manifest.json')) {
    return false;
  }

  try {
    const manifestContent = fs.readFileSync(MANIFEST_PATH, 'utf8');
    const manifest = JSON.parse(manifestContent);
    
    let isValid = true;
    
    // Check required properties
    for (const prop of REQUIRED_MANIFEST_PROPERTIES) {
      if (manifest[prop]) {
        console.log(`✅ Required property '${prop}': Present`);
      } else {
        console.log(`❌ Required property '${prop}': Missing`);
        isValid = false;
      }
    }
    
    // Validate icons
    if (manifest.icons && Array.isArray(manifest.icons)) {
      console.log(`✅ Icons array: Found ${manifest.icons.length} icons`);
      
      for (const icon of manifest.icons) {
        for (const prop of REQUIRED_ICON_PROPERTIES) {
          if (icon[prop]) {
            console.log(`  ✅ Icon property '${prop}': Present`);
          } else {
            console.log(`  ❌ Icon property '${prop}': Missing`);
            isValid = false;
          }
        }
      }
    } else {
      console.log(`❌ Icons array: Missing or invalid`);
      isValid = false;
    }
    
    // Check for advanced features
    const advancedFeatures = [
      'shortcuts',
      'screenshots',
      'categories',
      'features',
      'protocol_handlers',
      'file_handlers',
      'share_target'
    ];
    
    console.log('\n🚀 Advanced PWA Features:');
    for (const feature of advancedFeatures) {
      if (manifest[feature]) {
        console.log(`✅ ${feature}: Implemented`);
      } else {
        console.log(`⏭️  ${feature}: Not implemented (optional)`);
      }
    }
    
    return isValid;
  } catch (error) {
    console.log(`❌ Manifest validation error: ${error.message}`);
    return false;
  }
}

function validateFavicons() {
  console.log('\n🎨 Validating Favicon System...');
  
  let validCount = 0;
  let totalCount = REQUIRED_FAVICONS.length;
  
  for (const favicon of REQUIRED_FAVICONS) {
    const faviconPath = path.join(PUBLIC_DIR, favicon);
    if (checkFileExists(faviconPath, favicon)) {
      validCount++;
    }
  }
  
  console.log(`\n📊 Favicon Summary: ${validCount}/${totalCount} files present`);
  
  if (validCount === totalCount) {
    console.log('✅ All required favicons are present');
    return true;
  } else {
    console.log(`❌ Missing ${totalCount - validCount} favicon files`);
    return false;
  }
}

function validateBrowserConfig() {
  console.log('\n🪟 Validating Microsoft Browser Config...');
  
  if (!checkFileExists(BROWSERCONFIG_PATH, 'browserconfig.xml')) {
    return false;
  }
  
  try {
    const configContent = fs.readFileSync(BROWSERCONFIG_PATH, 'utf8');
    
    // Basic XML validation
    if (configContent.includes('<browserconfig>') && configContent.includes('</browserconfig>')) {
      console.log('✅ browserconfig.xml: Valid XML structure');
      return true;
    } else {
      console.log('❌ browserconfig.xml: Invalid XML structure');
      return false;
    }
  } catch (error) {
    console.log(`❌ Browser config validation error: ${error.message}`);
    return false;
  }
}

function generateValidationReport(manifestValid, faviconsValid, browserConfigValid) {
  console.log('\n📊 PWA Validation Report');
  console.log('='.repeat(50));
  
  const overallScore = [manifestValid, faviconsValid, browserConfigValid].filter(Boolean).length;
  const totalChecks = 3;
  
  console.log(`Overall Score: ${overallScore}/${totalChecks}`);
  
  if (overallScore === totalChecks) {
    console.log('🎉 PWA system is fully configured and ready!');
  } else if (overallScore >= 2) {
    console.log('⚠️  PWA system is mostly configured with minor issues');
  } else {
    console.log('❌ PWA system needs significant configuration');
  }
  
  console.log('\n📋 Component Status:');
  console.log(`Manifest: ${manifestValid ? '✅ Valid' : '❌ Invalid'}`);
  console.log(`Favicons: ${faviconsValid ? '✅ Complete' : '❌ Incomplete'}`);
  console.log(`Browser Config: ${browserConfigValid ? '✅ Valid' : '❌ Invalid'}`);
  
  console.log('\n🔗 Next Steps:');
  if (!manifestValid) {
    console.log('- Fix manifest.json validation errors');
  }
  if (!faviconsValid) {
    console.log('- Run: npm run create-favicons');
  }
  if (!browserConfigValid) {
    console.log('- Check browserconfig.xml file');
  }
  
  console.log('\n🧪 Testing Recommendations:');
  console.log('1. Test PWA installation in Chrome DevTools');
  console.log('2. Validate with Lighthouse PWA audit');
  console.log('3. Test on mobile devices (iOS/Android)');
  console.log('4. Check favicon display in different browsers');
  console.log('5. Verify app shortcuts functionality');
}

async function main() {
  console.log('🚀 Starting PWA validation for CareSync...\n');
  
  // Check if public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error(`❌ Public directory not found: ${PUBLIC_DIR}`);
    process.exit(1);
  }
  
  // Run validations
  const manifestValid = validateManifest();
  const faviconsValid = validateFavicons();
  const browserConfigValid = validateBrowserConfig();
  
  // Generate report
  generateValidationReport(manifestValid, faviconsValid, browserConfigValid);
}

// Run the script
main().catch(console.error);
