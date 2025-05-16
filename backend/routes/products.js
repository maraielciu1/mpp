import express from 'express';
import pool from '../data/db.js'

const router = express.Router();

const logAction = async (userId, action, productId) => {
    await pool.query(
        'INSERT INTO logs (user_id, action, product_id) VALUES ($1, $2, $3)',
        [userId, action, productId]
    );
};

// GET 
router.get('/', async (req, res) => {
    const { category, subCategory, sort } = req.query;

    let baseQuery = `
        SELECT 
            p.*, 
            COALESCE(json_agg(DISTINCT pi.url) FILTER (WHERE pi.id IS NOT NULL), '[]') AS image,
            COALESCE(json_agg(DISTINCT ps.size) FILTER (WHERE ps.id IS NOT NULL), '[]') AS sizes
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
    `;

    const conditions = [];
    const values = [];

    if (category) {
        values.push(category.toLowerCase());
        conditions.push(`LOWER(p.category) = $${values.length}`);
    }

    if (subCategory) {
        values.push(subCategory.toLowerCase());
        conditions.push(`LOWER(p.sub_category) = $${values.length}`);
    }


    if (conditions.length > 0) {
        baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    baseQuery += ' GROUP BY p.id';

    if (sort === 'price_asc') {
        baseQuery += ' ORDER BY p.price ASC';
    } else if (sort === 'price_desc') {
        baseQuery += ' ORDER BY p.price DESC';
    }

    try {
        const result = await pool.query(baseQuery, values);
        res.json(result.rows);
    } catch (err) {
        console.error('Failed to fetch products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// GET one product by id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

    try {
        const result = await pool.query(`
            SELECT 
                p.id AS id,
                p.name, 
                p.description, 
                p.price, 
                p.category, 
                p.sub_category AS "subCategory",
                p.bestseller,
                json_agg(DISTINCT pi.url) AS image,
                json_agg(DISTINCT ps.size) AS sizes
            FROM products p
            LEFT JOIN product_images pi ON pi.product_id = p.id
            LEFT JOIN product_sizes ps ON ps.product_id = p.id
            WHERE p.id = $1
            GROUP BY p.id
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST new product
router.post('/', async (req, res) => {
    const { name, description, price, image, category, subCategory, sizes, bestseller, user_id = 1 } = req.body;

    if (
        typeof name !== 'string' || name.length < 3 ||
        typeof description !== 'string' || description.length < 10 ||
        typeof price !== 'number' || price <= 0 ||
        typeof category !== 'string' ||
        typeof subCategory !== 'string' ||
        !Array.isArray(sizes) || sizes.length === 0 ||
        !Array.isArray(image) || image.length === 0
    ) {
        return res.status(400).json({ error: 'Invalid product data' });
    }

    try {
        const insertProduct = await pool.query(
            `INSERT INTO products (user_id, name, description, price, category, sub_category, bestseller)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING id`,
            [user_id, name, description, price, category, subCategory, !!bestseller]
        );

        const productId = insertProduct.rows[0].id;

        const imagePromises = image.map(url =>
            pool.query('INSERT INTO product_images (product_id, url) VALUES ($1, $2)', [productId, url])
        );

        const sizePromises = sizes.map(size =>
            pool.query('INSERT INTO product_sizes (product_id, size) VALUES ($1, $2)', [productId, size])
        );

        // Log the action
        await logAction(user_id, 'CREATE', productId);

        await Promise.all([...imagePromises, ...sizePromises]);

        res.status(201).json({ message: 'Product added', id: productId });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PATCH /products/:id
router.patch('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price, image, category, subCategory, sizes, bestseller } = req.body;

    try {
        const existing = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (existing.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await pool.query(
            `UPDATE products
             SET name = $1, description = $2, price = $3, category = $4, sub_category = $5, bestseller = $6
             WHERE id = $7`,
            [name, description, price, category, subCategory, bestseller, id]
        );

        await pool.query('DELETE FROM product_images WHERE product_id = $1', [id]);
        await Promise.all(image.map(url =>
            pool.query('INSERT INTO product_images (product_id, url) VALUES ($1, $2)', [id, url])
        ));

        await pool.query('DELETE FROM product_sizes WHERE product_id = $1', [id]);
        await Promise.all(sizes.map(size =>
            pool.query('INSERT INTO product_sizes (product_id, size) VALUES ($1, $2)', [id, size])
        ));

        // Log the action
        await logAction(existing.rows[0].user_id, 'UPDATE', id);

        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// DELETE product
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deleted = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (deleted.rowCount === 0) return res.status(404).json({ error: 'Product not found' });

        // Log the action
        await logAction(deleted.rows[0].user_id, 'DELETE', id);

        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/ping', (req, res) => {
    res.send('pong');
});

export default router;
