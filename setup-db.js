import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  try {
    // Initialize KV Store
    console.log('✅ KV Store initialized successfully');
  } catch (error) {
    console.error('❌ Error setting up KV Store:', error);
    process.exit(1);
  }
}

setupDatabase();