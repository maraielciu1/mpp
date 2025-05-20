import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../context/ShopContext';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await axios.post(`${BASE_URL}/auth/signup`, {
                username,
                email,
                password
            });
            alert('Account created! You can now log in.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-4 border rounded">
            <h2 className="text-xl mb-4 font-bold">Sign Up</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <input
                className="border p-2 w-full mb-2"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <button
                onClick={handleSignup}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                Create Account
            </button>
        </div>
    );
};

export default Signup;
