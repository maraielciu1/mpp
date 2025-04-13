// routes/products.js
import express from 'express';
const router = express.Router();
import { initialProducts } from '../data/InitialProductData.js';

let products = [...initialProducts];
console.log("Initial Products Loaded in route:", initialProducts.length);

// GET all products (with optional filter/sort)
router.get('/', (req, res) => {
    //products = [...initialProducts]; // reset

    let result = [...products];

    if (req.query.category) {
        result = result.filter(p => p.category === req.query.category);
    }
    if (req.query.subCategory) {
        result = result.filter(p => p.subCategory === req.query.subCategory);
    }

    if (req.query.sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (req.query.sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
    }

    result = result.map(p => ({
        ...p,
        image: Array.isArray(p.image)
            ? p.image.map(img => `${req.protocol}://${req.get('host')}/images/${img}`)
            : [`${req.protocol}://${req.get('host')}/images/${p.image}`]
    }));

    res.json(result);
});

// GET one product
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p._id === id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json({
        ...product,
        image: Array.isArray(product.image)
            ? product.image.map(img => `${req.protocol}://${req.get('host')}/images/${img}`)
            : [`${req.protocol}://${req.get('host')}/images/${product.image}`]
    });
});

// POST new product
router.post('/', (req, res) => {
    const { name, description, price, image, category, subCategory, sizes, bestseller } = req.body;

    if (
        typeof name !== 'string' || name.length < 3 ||
        typeof description !== 'string' || description.length < 10 ||
        typeof price !== 'number' || price <= 0 ||
        typeof category !== 'string' ||
        typeof subCategory !== 'string' ||
        !Array.isArray(sizes) || sizes.length === 0
    ) {
        return res.status(400).json({ error: 'Invalid product data' });
    }

    const newProduct = { ...req.body, _id: Date.now() };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PATCH update
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p._id === id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    const { name, description, price, image, category, subCategory, sizes, bestseller } = req.body;

    if (
        typeof name !== 'string' || name.length < 3 ||
        typeof description !== 'string' || description.length < 10 ||
        typeof price !== 'number' || price <= 0 ||
        typeof category !== 'string' ||
        typeof subCategory !== 'string' ||
        !Array.isArray(sizes) || sizes.length === 0
    ) {
        return res.status(400).json({ error: 'Invalid product data' });
    }
    const updatedProduct = { ...products[index], ...req.body };
    products[index] = updatedProduct;
    res.json(products[index]);
});

// DELETE product
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const initialLength = products.length;
    products = products.filter(p => p._id !== id);
    if (products.length === initialLength) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Deleted successfully' });
});

router.get('/ping', (req, res) => {
    res.send('pong');
});


export default router;
