import express from 'express';
import pool from '../data/db.js';

const router = express.Router();

router.get('/avg-products-per-user', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                ROUND(COUNT(*) * 1.0 / COUNT(DISTINCT user_id), 2) AS avg_products_per_user
            FROM products
            WHERE user_id IS NOT NULL
        `);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching statistic:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
