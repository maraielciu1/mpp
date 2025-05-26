import express from 'express';
import pool from '../data/db.js';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT id, email, username, is_admin FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        console.log("DEBUG: JWT_SECRET is", process.env.JWT_SECRET);
        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, SECRET, { expiresIn: '1h' });

        return res.json({ user, token });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if email or username already exists
        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1 OR username = $2',
            [email, username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'Email or username already exists' });
        }

        // Insert the new user
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, is_admin',
            [username, email, password]
        );

        const newUser = result.rows[0];
        return res.status(201).json({ user: newUser });
    } catch (err) {
        console.error('Signup error:', err);

        if (err.code === '23505') { // unique_violation
            return res.status(409).json({ error: 'Username or email already taken' });
        }

        return res.status(500).json({ error: 'Server error' });
    }
});


export default router;