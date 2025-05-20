// --- Login.jsx ---
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../context/ShopContext';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            console.log('Logged in user:', res.data.user);
            onLogin(res.data.user);
        } catch (err) {
            setError('Invalid credentials');
        }
    };


    return (
        <div className="max-w-md mx-auto mt-20 p-4 border rounded">
            <h2 className="text-xl mb-4 font-bold">Login</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <input
                className="border p-2 w-full mb-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-4"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
        </div>
    );
};

export default Login;
