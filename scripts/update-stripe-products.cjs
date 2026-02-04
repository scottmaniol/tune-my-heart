/**
 * Update Stripe Products and Prices to include "Tune My Heart" branding
 * 
 * This script updates:
 * 1. Product names to include "Tune My Heart"
 * 2. Product descriptions
 * 3. Product metadata
 * 4. Price nicknames to be more descriptive
 * 
 * Run: node scripts/update-stripe-products.cjs
 */

const Stripe = require('../functions/node_modules/stripe');

// Read Stripe secret key from functions/.env
const fs = require('fs');
const path = require('path');
let stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Try to read from functions/.env if not in environment
if (!stripeSecretKey) {
  try {
    const envPath = path.join(__dirname, '../functions/.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const stripeSecretMatch = envContent.match(/STRIPE_SECRET_KEY[=:](.+)/);
    stripeSecretKey = stripeSecretMatch ? stripeSecretMatch[1].trim().replace(/['"]/g, '') : null;
  } catch (err) {
    // .env file may not exist
  }
}

if (!stripeSecretKey) {
  console.error('❌ STRIPE_SECRET_KEY not found');
  console.error('Please run this script with the environment variable:');
  console.error('STRIPE_SECRET_KEY=sk_live_xxx node scripts/update-stripe-products.cjs');
  process.exit(1);
}

// Initialize Stripe
const stripe = new Stripe(stripeSecretKey);

// Your LIVE price IDs
const PRICE_IDS = {
  individual: 'price_1Si2rHDdvLsK34Jx1YZ3y7Qt',
  family: 'price_1Si2sYDdvLsK34Jx3T8iLyCp'
};

async function updateProducts() {
  console.log('🔄 Updating Stripe Products and Prices with "Tune My Heart" branding...\n');

  try {
    // Get product IDs from prices
    const individualPrice = await stripe.prices.retrieve(PRICE_IDS.individual);
    const familyPrice = await stripe.prices.retrieve(PRICE_IDS.family);

    console.log('📦 Individual Product ID:', individualPrice.product);
    console.log('📦 Family Product ID:', familyPrice.product);
    console.log('');

    // Update Individual Product
    console.log('Updating Individual Product...');
    const updatedIndividualProduct = await stripe.products.update(
      individualPrice.product,
      {
        name: 'Tune My Heart - Individual Plan',
        description: 'Annual subscription to Tune My Heart - Individual Plan ($15/year)',
        statement_descriptor: 'TUNE MY HEART',
        metadata: {
          app: 'Tune My Heart',
          plan: 'individual',
          service: 'Tune My Heart Subscription'
        }
      }
    );
    console.log('✅ Individual Product updated:', updatedIndividualProduct.name);

    // Update Family Product
    console.log('\nUpdating Family Product...');
    const updatedFamilyProduct = await stripe.products.update(
      familyPrice.product,
      {
        name: 'Tune My Heart - Family Plan',
        description: 'Annual subscription to Tune My Heart - Family Plan ($20/year)',
        statement_descriptor: 'TUNE MY HEART',
        metadata: {
          app: 'Tune My Heart',
          plan: 'family',
          service: 'Tune My Heart Subscription'
        }
      }
    );
    console.log('✅ Family Product updated:', updatedFamilyProduct.name);

    // Update Individual Price nickname
    console.log('\nUpdating Individual Price...');
    const updatedIndividualPrice = await stripe.prices.update(
      PRICE_IDS.individual,
      {
        nickname: 'Tune My Heart - Individual Annual',
        metadata: {
          app: 'Tune My Heart',
          plan: 'individual'
        }
      }
    );
    console.log('✅ Individual Price updated:', updatedIndividualPrice.nickname);

    // Update Family Price nickname
    console.log('\nUpdating Family Price...');
    const updatedFamilyPrice = await stripe.prices.update(
      PRICE_IDS.family,
      {
        nickname: 'Tune My Heart - Family Annual',
        metadata: {
          app: 'Tune My Heart',
          plan: 'family'
        }
      }
    );
    console.log('✅ Family Price updated:', updatedFamilyPrice.nickname);

    console.log('\n✅ All Stripe products and prices have been updated!');
    console.log('\n📋 Summary:');
    console.log('- Product names now include "Tune My Heart"');
    console.log('- Statement descriptor set to "TUNE MY HEART" (appears on card statements)');
    console.log('- Price nicknames updated for clarity');
    console.log('- Metadata added for better tracking');
    console.log('\n💡 What your finance manager will see:');
    console.log('- In Stripe Dashboard: "Tune My Heart - [Plan Type]"');
    console.log('- On customer invoices: "Tune My Heart - Individual/Family Plan"');
    console.log('- In payment lists: Clear association with "Tune My Heart"');
    console.log('- On bank statements: "TUNE MY HEART" (subject to card issuer display rules)');

  } catch (error) {
    console.error('❌ Error updating Stripe products:', error.message);
    if (error.type === 'StripeAuthenticationError') {
      console.error('\n⚠️  Make sure STRIPE_SECRET_KEY is set correctly in functions/.env');
    }
    process.exit(1);
  }

  process.exit(0);
}

// Run the update
updateProducts();
