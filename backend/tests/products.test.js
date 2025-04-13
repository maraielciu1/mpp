import request from 'supertest';
import express from 'express';
import productsRoute from '../routes/products.js';

const app = express();
app.use(express.json());
app.use('/products', productsRoute);

describe('Products API', () => {
    it('GET /products - should return all products', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /products?category=Men - should return filtered products by category', async () => {
        const res = await request(app).get('/products?category=Men');
        expect(res.statusCode).toBe(200);
        expect(res.body.every(p => p.category === 'Men')).toBe(true);
    });

    it('GET /products?subCategory=Topwear - should return filtered products by subCategory', async () => {
        const res = await request(app).get('/products?subCategory=Topwear');
        expect(res.statusCode).toBe(200);
        expect(res.body.every(p => p.subCategory === 'Topwear')).toBe(true);
    });

    it('GET /products?sort=price_asc - should return products sorted by ascending price', async () => {
        const res = await request(app).get('/products?sort=price_asc');
        expect(res.statusCode).toBe(200);
        for (let i = 1; i < res.body.length; i++) {
            expect(res.body[i].price).toBeGreaterThanOrEqual(res.body[i - 1].price);
        }
    });

    it('GET /products?sort=price_desc - should return products sorted by descending price', async () => {
        const res = await request(app).get('/products?sort=price_desc');
        expect(res.statusCode).toBe(200);
        for (let i = 1; i < res.body.length; i++) {
            expect(res.body[i].price).toBeLessThanOrEqual(res.body[i - 1].price);
        }
    });

    it('GET /products/:id - should return one product', async () => {
        const res = await request(app).get('/products/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBeDefined();
    });

    it('GET /products/:id - should return 404 for invalid ID', async () => {
        const res = await request(app).get('/products/9999');
        expect(res.statusCode).toBe(404);
    });

    it('POST /products - should add a new product', async () => {
        const newProduct = {
            name: "Test Product",
            description: "A valid description for testing",
            price: 100,
            image: ["test.png"],
            category: "Men",
            subCategory: "Topwear",
            sizes: ["M", "L"],
            bestseller: false
        };
        const res = await request(app).post('/products').send(newProduct);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Test Product");
    });

    it('PATCH /products/:id - should update a product', async () => {
        const updateData = {
            name: "Updated Product",
            description: "Updated description with enough length",
            price: 123,
            image: ["updated.png"],
            category: "Women",
            subCategory: "Outerwear",
            sizes: ["S", "M"],
            bestseller: true
        };
        const res = await request(app).patch('/products/2').send(updateData);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Updated Product");
    });

    it('PATCH /products/:id - should return 404 for invalid ID', async () => {
        const updateData = {
            name: "X",
            description: "short",
            price: -10,
            image: ["bad.png"],
            category: "Invalid",
            subCategory: "Invalid",
            sizes: [],
            bestseller: false
        };
        const res = await request(app).patch('/products/9999').send(updateData);
        expect(res.statusCode).toBe(404);
    });

    it('DELETE /products/:id - should delete a product', async () => {
        const res = await request(app).delete('/products/3');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Deleted successfully');
    });

    it('DELETE /products/:id - should return 404 if product not found', async () => {
        const res = await request(app).delete('/products/9999');
        expect(res.statusCode).toBe(404);
    });
});
