#!/usr/bin/env node

/**
 * Simple Favicon Creation Script for CareSync
 * 
 * This script creates missing favicon files by copying and renaming
 * existing favicon files to match the comprehensive favicon system.
 * 
 * Usage: node scripts/create-missing-favicons.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const EXISTING_FAVICON = path.join(PUBLIC_DIR, 'favicon.png');
const EXISTING_192 = path.join(PUBLIC_DIR, 'favicon_192px.png');
const EXISTING_128 = path.join(PUBLIC_DIR, 'favicon_128px.png');

// Favicon mappings (source -> destination)
const FAVICON_MAPPINGS = [
  // Standard favicons - use existing favicon.png as base
  { src: 'favicon.png', dest: 'favicon-16x16.png' },
  { src: 'favicon.png', dest: 'favicon-32x32.png' },
  { src: 'favicon.png', dest: 'favicon-48x48.png' },
  { src: 'favicon.png', dest: 'favicon-72x72.png' },
  { src: 'favicon.png', dest: 'favicon-96x96.png' },
  { src: 'favicon_128px.png', dest: 'favicon-128x128.png' },
  { src: 'favicon.png', dest: 'favicon-144x144.png' },
  { src: 'favicon.png', dest: 'favicon-152x152.png' },
  { src: 'favicon_192px.png', dest: 'favicon-192x192.png' },
  { src: 'favicon.png', dest: 'favicon-384x384.png' },
  { src: 'favicon.png', dest: 'favicon-512x512.png' },
  
  // Apple Touch Icons - use existing favicon.png as base
  { src: 'favicon.png', dest: 'apple-touch-icon-57x57.png' },
  { src: 'favicon.png', dest: 'apple-touch-icon-60x60.png' },
  { src: 'favicon.png', dest: 'apple-touch-icon-72x72.png' },
  { src: 'favicon.png', dest: 'apple-touch-icon-76x76.png' },
  { src: 'favicon.png', dest: 'apple-touch-icon-114x114.png' },
  { src: 'favicon.png', dest: 'apple-touch-icon-120x120.png' },
  { src: 'favicon.png', dest: 'apple-touch-icon-144x144.png' },
  { src: 'favicon.png', dest: 'apple-touch-icon-152x152.png' },
  { src: 'favicon.png', dest: 'apple-touch-icon-180x180.png' },
  
  // Android Chrome Icons
  { src: 'favicon_192px.png', dest: 'android-chrome-192x192.png' },
  { src: 'favicon.png', dest: 'android-chrome-512x512.png' },
  
  // Microsoft Tiles
  { src: 'favicon.png', dest: 'mstile-70x70.png' },
  { src: 'favicon.png', dest: 'mstile-144x144.png' },
  { src: 'favicon.png', dest: 'mstile-150x150.png' },
  { src: 'favicon.png', dest: 'mstile-310x310.png' },
  
  // Maskable icons
  { src: 'favicon_192px.png', dest: 'favicon-192x192-maskable.png' },
  { src: 'favicon.png', dest: 'favicon-512x512-maskable.png' },
];

// Special tile for Microsoft (310x150)
const MS_WIDE_TILE = {
  src: 'favicon.png',
  dest: 'mstile-310x150.png'
};

function copyFile(srcPath, destPath) {
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      return true;
    } else {
      console.warn(`⚠️  Source file not found: ${srcPath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error copying ${srcPath} to ${destPath}:`, error.message);
    return false;
  }
}

function createIcoFile() {
  try {
    const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');
    const pngPath = path.join(PUBLIC_DIR, 'favicon.png');
    
    if (fs.existsSync(pngPath)) {
      // For now, just copy the PNG as ICO (browsers will handle it)
      fs.copyFileSync(pngPath, icoPath);
      console.log('✅ Created: favicon.ico (copied from favicon.png)');
      return true;
    } else {
      console.warn('⚠️  favicon.png not found, skipping favicon.ico creation');
      return false;
    }
  } catch (error) {
    console.error('❌ Error creating favicon.ico:', error.message);
    return false;
  }
}

function createMsWideTile() {
  try {
    const srcPath = path.join(PUBLIC_DIR, MS_WIDE_TILE.src);
    const destPath = path.join(PUBLIC_DIR, MS_WIDE_TILE.dest);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Created: ${MS_WIDE_TILE.dest}`);
      return true;
    } else {
      console.warn(`⚠️  Source file not found: ${MS_WIDE_TILE.src}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error creating ${MS_WIDE_TILE.dest}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Creating missing favicon files for CareSync...\n');

  // Check if public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error(`❌ Public directory not found: ${PUBLIC_DIR}`);
    process.exit(1);
  }

  let successCount = 0;
  let totalCount = 0;

  // Create standard favicon mappings
  console.log('📱 Creating standard favicons...');
  for (const mapping of FAVICON_MAPPINGS) {
    const srcPath = path.join(PUBLIC_DIR, mapping.src);
    const destPath = path.join(PUBLIC_DIR, mapping.dest);
    
    totalCount++;
    
    // Only create if destination doesn't exist
    if (!fs.existsSync(destPath)) {
      if (copyFile(srcPath, destPath)) {
        console.log(`✅ Created: ${mapping.dest}`);
        successCount++;
      }
    } else {
      console.log(`⏭️  Skipped: ${mapping.dest} (already exists)`);
    }
  }

  // Create Microsoft wide tile
  console.log('\n🪟 Creating Microsoft wide tile...');
  const msWideDest = path.join(PUBLIC_DIR, MS_WIDE_TILE.dest);
  if (!fs.existsSync(msWideDest)) {
    if (createMsWideTile()) {
      successCount++;
    }
  } else {
    console.log(`⏭️  Skipped: ${MS_WIDE_TILE.dest} (already exists)`);
  }

  // Create ICO file
  console.log('\n🔗 Creating ICO file...');
  const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');
  if (!fs.existsSync(icoPath)) {
    if (createIcoFile()) {
      successCount++;
    }
  } else {
    console.log('⏭️  Skipped: favicon.ico (already exists)');
  }

  console.log(`\n🎉 Favicon creation complete!`);
  console.log(`📊 Created ${successCount} new files`);
  console.log(`📋 Total files processed: ${totalCount + 2}`);

  console.log('\n📋 Next steps:');
  console.log('1. Verify all favicon files in the public directory');
  console.log('2. Test favicon display in different browsers');
  console.log('3. Install PWA on different devices to test icons');
  console.log('4. Use online favicon validators to check completeness');
  
  console.log('\n💡 Note: This script creates basic favicon files by copying existing ones.');
  console.log('   For optimal quality, consider using the full generation script with Sharp:');
  console.log('   npm install sharp && npm run generate-favicons');
}

// Run the script
main().catch(console.error);

export { copyFile, createIcoFile, createMsWideTile };
