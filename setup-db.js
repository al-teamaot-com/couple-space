import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEON_DATABASE_URL);

async function setupDatabase() {
  try {
    // Create sessions table
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user1_name TEXT NOT NULL,
        user2_name TEXT
      )
    `;

    // Create responses table
    await sql`
      CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        session_id TEXT REFERENCES sessions(id),
        user_name TEXT NOT NULL,
        question_id INTEGER NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();