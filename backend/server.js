import express from 'express';
import cors from 'cors';
import path from 'path';
import productsRoute from './routes/products.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve static images
app.use('/images', express.static(path.resolve('public/images')));

// Routes
app.use('/products', productsRoute);

// Root
app.get('/', (req, res) => {
    res.send("API is working");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
