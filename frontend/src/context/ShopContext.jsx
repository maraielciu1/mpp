import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BASE_URL = 'http://localhost:4000';
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [status, setStatus] = useState('checking');

    const user = JSON.parse(localStorage.getItem('activeUser'));

    const checkServer = async () => {
        if (!navigator.onLine) return 'offline';
        try {
            const res = await fetch(`${BASE_URL}/ping`);
            return res.ok ? 'online' : 'server-down';
        } catch {
            return 'server-down';
        }
    };

    const queueKey = 'offlineQueue';
    const cacheKey = 'cachedProducts';
    const idMapKey = 'tempIdMap';

    const getQueue = () => JSON.parse(localStorage.getItem(queueKey) || '[]');
    const setQueue = (q) => localStorage.setItem(queueKey, JSON.stringify(q));
    const getIdMap = () => JSON.parse(localStorage.getItem(idMapKey) || '{}');
    const setIdMap = (map) => localStorage.setItem(idMapKey, JSON.stringify(map));

    const queueOperation = (operation) => {
        const queue = getQueue();
        queue.push(operation);
        setQueue(queue);
    };

    const syncQueue = async () => {
        const queue = getQueue();
        const idMap = getIdMap();
        const newQueue = [];
        for (const op of queue) {
            try {
                const payload = {
                    ...op.data,
                    image: op.data.image[0]
                };
                if (op.method === 'POST') {
                    const res = await axios.post(`${BASE_URL}/products`, payload);
                    idMap[op.data.id] = res.data.id;
                    setIdMap(idMap);
                } else if (op.method === 'PATCH') {
                    const realId = idMap[op.id] || op.id;
                    await axios.patch(`${BASE_URL}/products/${realId}`, payload);
                } else if (op.method === 'DELETE') {
                    const realId = idMap[op.id] || op.id;
                    await axios.delete(`${BASE_URL}/products/${realId}`);
                }
            } catch {
                newQueue.push(op);
            }
        }
        setQueue(newQueue);
        await fetchProducts(true);
    };

    const fetchProducts = async (forceServer = false) => {
        if (!user) return;
        if (!forceServer && status !== 'online') {
            const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
            setProducts(cached.filter(p => p.user_id === user.id));
            return;
        }
        try {
            const res = await axios.get(`${BASE_URL}/products`);
            const normalized = res.data.map(p => ({
                ...p,
                subCategory: p.subCategory || p.sub_category || '',
                image: Array.isArray(p.image) ? p.image : [p.image],
            })).filter(p => p.user_id === user.id);
            setProducts(normalized);
            localStorage.setItem(cacheKey, JSON.stringify(normalized));
        } catch {
            const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
            setProducts(cached.filter(p => p.user_id === user.id));
        }
    };

    useEffect(() => {
        const updateStatus = async () => {
            const result = await checkServer();
            setStatus(result);
            if (result === 'online') {
                await syncQueue();
            } else {
                const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
                setProducts(cached.filter(p => p.user_id === user.id));
            }
        };
        updateStatus();
        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);
        return () => {
            window.removeEventListener('online', updateStatus);
            window.removeEventListener('offline', updateStatus);
        };
    }, []);

    const addProduct = async (product) => {
        const newProduct = {
            ...product,
            user_id: user.id,
            image: product.image,
        };
        try {
            const res = await axios.post(`${BASE_URL}/products`, newProduct);
            const updated = [...products, { ...res.data, user_id: user.id }];
            setProducts(updated);
            localStorage.setItem(cacheKey, JSON.stringify(updated));
        } catch (err) {
            console.error('Failed to add product', err);
        }
    };

    const updateProduct = async (id, data) => {
        try {
            const res = await axios.patch(`${BASE_URL}/products/${id}`, {
                ...data,
                image: data.image,
            });
            const updated = products.map(p => (p.id === id ? res.data : p));
            setProducts(updated);
            localStorage.setItem(cacheKey, JSON.stringify(updated));
        } catch (err) {
            console.error('Failed to update product', err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/products/${id}`);
            const filtered = products.filter(p => p.id !== id);
            setProducts(filtered);
            localStorage.setItem(cacheKey, JSON.stringify(filtered));
        } catch (err) {
            console.error('Failed to delete product', err);
        }
    };

    return (
        <ShopContext.Provider
            value={{
                products,
                setProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                search,
                setSearch,
                showSearch,
                setShowSearch,
                status,
                fetchProducts
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
