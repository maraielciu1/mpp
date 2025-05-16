import express from 'express';
import pool from '../data/db.js';

const router = express.Router();

const monitorUsers = async () => {
    const result = await pool.query(`
      SELECT user_id, COUNT(*) AS cnt
      FROM logs
      WHERE timestamp > NOW() - INTERVAL '5 minutes'
      GROUP BY user_id
      HAVING COUNT(*) > 10
    `);

    for (const row of result.rows) {
        await pool.query(`
        INSERT INTO monitored_users (user_id, reason, last_checked)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        ON CONFLICT (user_id) DO UPDATE 
        SET reason = $2, last_checked = CURRENT_TIMESTAMP
      `, [row.user_id, 'High CRUD activity in last 5 minutes']);
    }
};

setInterval(monitorUsers, 60 * 1000);

// Admin-only route 
router.get('/monitored-users', async (req, res) => {
    const isAdmin = req.query.admin === 'true';

    if (!isAdmin) return res.sendStatus(403);

    try {
        const result = await pool.query(`
            SELECT mu.user_id, u.username, mu.reason, mu.last_checked
            FROM monitored_users mu
            JOIN users u ON u.id = mu.user_id
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching monitored users:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/logs', async (req, res) => {
    const { admin } = req.query;

    if (admin !== 'true') return res.sendStatus(403);

    try {
        const result = await pool.query(`
        SELECT * FROM logs
        ORDER BY timestamp DESC
        LIMIT 200
      `);
        res.json(result.rows);
    } catch (err) {
        console.error('Failed to fetch logs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
