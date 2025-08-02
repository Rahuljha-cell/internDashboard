// controllers/dashboard.js
import pkg from 'pg';
const { Pool } = pkg;

// Setup Neon PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Store your Neon DB URL in .env
  ssl: {
    rejectUnauthorized: false,
  },
});
// POST handler — saving donations from form
export const postDonation = async (req, res) => {
  const { username, email, raisedfunds, referralcode } = req.body;
    console.log("🔍 Received donation submission:", req.body);
    if (
        username === undefined || 
        email === undefined || 
        raisedfunds === undefined || 
        referralcode === undefined
    ) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }


  try {
    await pool.query(
      'INSERT INTO donations (username, email, raisedfunds, referralcode) VALUES ($1, $2, $3, $4)',
      [username, email, raisedfunds, referralcode]
    );
    console.log("✅ Inserted donation into DB");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Donation insert error:', error.message);
    res.status(500).json({ success: false, message: 'Database error' });
  }
};

export const dashboard = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT username, email, raisedfunds, referralcode FROM donations'
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error('Dashboard fetch error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
    });
  }
};

