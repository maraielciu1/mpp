// server.js
import './loadEnv.js'; // Load environment variables
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import productsRoute from './routes/products.js';
import fileRoute from './routes/files.js';
import { WebSocketServer } from 'ws';
import statsRoutes from './routes/stats.js';
import authRoute from './routes/auth.js';
import adminRoute from './routes/admin.js';
import offersRoute from './routes/offers.js';

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
app.use('/stats', statsRoutes);
app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/offers', offersRoute);

// Root
app.get('/', (req, res) => {
    res.send("API is working");
});

// Ping
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', ws => {
    console.log('Client connected');
});


const broadcast = (data) => {
    const message = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(message);
        }
    });
};

app.get('/start-generation', (req, res) => {
    let count = 0;
    const interval = setInterval(() => {
        const mock = {
            _id: Date.now(),
            name: `Mock Product ${count + 1}`,
            description: 'Generated via server',
            price: Math.floor(Math.random() * 150) + 10,
            category: ['Men', 'Women', 'Kids'][Math.floor(Math.random() * 3)],
            subCategory: ['Topwear', 'Bottomwear', 'Outerwear'][Math.floor(Math.random() * 3)],
            sizes: ['S', 'M', 'L'],
            image: ['http://localhost:4000/images/Boy_Blouse1.png'],
            bestseller: false
        };

        broadcast({ type: 'new_product', payload: mock });

        if (++count >= 10) clearInterval(interval);
    }, 2000);

    res.send('Generation started');
});

export default app;