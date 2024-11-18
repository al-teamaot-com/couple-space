import { execSync } from 'child_process';

console.log('Setting up Netlify KV Store...\n');

try {
  // Create KV Store
  console.log('Creating KV Store...');
  execSync('netlify env:set NETLIFY_KV_NAMESPACE COUPLE_QUIZ', { stdio: 'inherit' });
  
  console.log('\n✅ KV Store setup completed successfully!');
  console.log('\nYou can now use KV Store in your application.');
} catch (error) {
  console.error('\n❌ Error setting up KV Store:', error.message);
  console.log('\nTroubleshooting steps:');
  console.log('1. Make sure you\'re logged in to Netlify CLI (run "netlify login")');
  console.log('2. Ensure you have the necessary permissions for your team/site');
  console.log('3. Check if you\'ve reached your KV Store quota');
  process.exit(1);
}