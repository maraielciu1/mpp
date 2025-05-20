import express from 'express';
import pool from '../data/db.js';

const router = express.Router();

// Submit a new offer
router.post('/', async (req, res) => {
    const { product_id, sender_id, amount } = req.body;
    if (!product_id || !sender_id || !amount) {
        return res.status(400).json({ error: 'Missing offer data' });
    }

    try {
        // Check if any offer is already accepted for this product
        const accepted = await pool.query(
            'SELECT 1 FROM offers WHERE product_id = $1 AND is_accepted = TRUE LIMIT 1',
            [product_id]
        );
        if (accepted.rowCount > 0) {
            return res.status(403).json({ error: 'Offer already accepted for this product' });
        }

        const result = await pool.query(
            'INSERT INTO offers (product_id, sender_id, amount) VALUES ($1, $2, $3) RETURNING *',
            [product_id, sender_id, amount]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating offer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:offerId', async (req, res) => {
    const offerId = parseInt(req.params.offerId);
    if (isNaN(offerId)) return res.status(400).json({ error: 'Invalid offer ID' });

    try {
        const result = await pool.query('DELETE FROM offers WHERE id = $1 RETURNING *', [offerId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Offer not found or already deleted' });
        }

        res.status(200).json({ message: 'Offer cancelled' });
    } catch (err) {
        console.error('Error cancelling offer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Get all offers for a product (with sender username/email)
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const result = await pool.query(`
            SELECT o.*, u.username, u.email
            FROM offers o
            JOIN users u ON o.sender_id = u.id
            WHERE o.product_id = $1
            ORDER BY o.created_at DESC
        `, [productId]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching offers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Accept an offer and return buyer email
router.post('/:offerId/accept', async (req, res) => {
    const offerId = parseInt(req.params.offerId);
    if (isNaN(offerId)) return res.status(400).json({ error: 'Invalid offer ID' });

    try {
        const offer = await pool.query('SELECT product_id FROM offers WHERE id = $1', [offerId]);
        if (offer.rowCount === 0) return res.status(404).json({ error: 'Offer not found' });

        const productId = offer.rows[0].product_id;

        await pool.query('UPDATE offers SET is_accepted = TRUE WHERE id = $1', [offerId]);
        await pool.query('UPDATE offers SET is_accepted = FALSE WHERE product_id = $1 AND id != $2', [productId, offerId]);

        const senderRes = await pool.query(`
            SELECT u.email FROM offers o
            JOIN users u ON o.sender_id = u.id
            WHERE o.id = $1
        `, [offerId]);

        res.json({ email: senderRes.rows[0].email });
    } catch (err) {
        console.error('Error accepting offer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Decline an offer
router.post('/:offerId/decline', async (req, res) => {
    const offerId = parseInt(req.params.offerId);
    if (isNaN(offerId)) return res.status(400).json({ error: 'Invalid offer ID' });

    try {
        await pool.query('DELETE FROM offers WHERE id = $1', [offerId]);
        res.sendStatus(204);
    } catch (err) {
        console.error('Error declining offer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
