// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import productsRoute from './routes/products.js';
import fileRoute from './routes/files.js'; // ✅ Import your file route

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve static assets
app.use('/images', express.static(path.resolve('public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/products', productsRoute);
app.use('/api/files', fileRoute);

// Root
app.get('/', (req, res) => {
    res.send("API is working");
});

// Ping
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
