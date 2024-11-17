const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = new Pool({
  user: 'u4uf5dh910b1sd',
  host: 'c9uss87s9bdb8n.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
  database: 'dd5ht5bkp5c8ui',
  password: 'p444ac011c3ea7f25cf8043bc8745548b67634f872a11ba160289fb2dca14f2c1',
  port: 5432,
});

app.get('/api/questions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM questions');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});