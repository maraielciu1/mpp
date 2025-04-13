
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();

const normalizeImage = (img) => {
    const filename = Array.isArray(img) ? img[0] : img;
    if (!filename.startsWith('http')) {
        return `http://localhost:4000/images/${filename}`;
    }
    return filename;
};

const normalizeProduct = (product) => {
    const imageArray = Array.isArray(product.image) ? product.image : [product.image];
    return {
        ...product,
        image: imageArray.map(normalizeImage)
    };
};

const extractFilename = (img) => Array.isArray(img) ? img[0]?.split('/').pop() : img?.split('/').pop();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [status, setStatus] = useState('checking'); // 'online', 'offline', 'server-down'

    const checkServer = async () => {
        if (!navigator.onLine) return 'offline';
        try {
            const res = await fetch('http://localhost:4000/ping');
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
                    image: extractFilename(op.data.image)
                };
                if (op.method === 'POST') {
                    const res = await axios.post('http://localhost:4000/products', payload);
                    idMap[op.data._id] = res.data._id;
                    setIdMap(idMap);
                }
                else if (op.method === 'PATCH') {
                    const realId = idMap[op.id] || op.id;
                    await axios.patch(`http://localhost:4000/products/${realId}`, payload);
                }
                else if (op.method === 'DELETE') {
                    const realId = idMap[op.id] || op.id;
                    await axios.delete(`http://localhost:4000/products/${realId}`);
                }
            } catch {
                newQueue.push(op); // keep failed ones
            }
        }
        setQueue(newQueue);
        await fetchProducts(true);
    };

    const fetchProducts = async (forceServer = false) => {
        if (!forceServer && status !== 'online') {
            const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
            setProducts(cached);
            return;
        }
        try {
            const res = await axios.get('http://localhost:4000/products');
            const normalized = res.data.map(normalizeProduct);
            setProducts(normalized);
            localStorage.setItem(cacheKey, JSON.stringify(normalized)); // cache normalized
        } catch {
            const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
            setProducts(cached);
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
                setProducts(cached);
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
        const fileName = extractFilename(product.image);
        const localId = Date.now();
        const localProduct = normalizeProduct({ ...product, image: fileName, _id: localId });

        if (status !== 'online') {
            queueOperation({ method: 'POST', data: localProduct });
            const newProducts = [...products, localProduct];
            setProducts(newProducts);
            localStorage.setItem(cacheKey, JSON.stringify(newProducts));
            return;
        }
        try {
            const res = await axios.post('http://localhost:4000/products', { ...product, image: fileName });
            const normalized = normalizeProduct(res.data);
            const newProducts = [...products, normalized];
            setProducts(newProducts);
            localStorage.setItem(cacheKey, JSON.stringify(newProducts));
        } catch (err) {
            console.error('Failed to add product', err);
        }
    };

    const updateProduct = async (id, data) => {
        const fileName = extractFilename(data.image);
        const formatted = normalizeProduct({ ...data, image: fileName });

        if (status !== 'online') {
            queueOperation({ method: 'PATCH', id, data: formatted });
            const updated = products.map(p =>
                p._id === id ? normalizeProduct({ ...p, ...formatted }) : p
            );
            setProducts(updated);
            localStorage.setItem(cacheKey, JSON.stringify(updated));
            return;
        }
        try {
            const res = await axios.patch(`http://localhost:4000/products/${id}`, { ...data, image: fileName });
            const normalized = normalizeProduct(res.data);
            const updated = products.map(p => p._id === id ? normalized : p);
            setProducts(updated);
            localStorage.setItem(cacheKey, JSON.stringify(updated));
        } catch (err) {
            console.error('Failed to update product', err);
        }
    };

    const deleteProduct = async (id) => {
        if (status !== 'online') {
            const idMap = getIdMap();
            const realId = idMap[id] || id;
            queueOperation({ method: 'DELETE', id: realId });
            const filtered = products.filter(p => p._id !== id);
            setProducts(filtered);
            localStorage.setItem(cacheKey, JSON.stringify(filtered));
            return;
        }
        try {
            await axios.delete(`http://localhost:4000/products/${id}`);
            const filtered = products.filter(p => p._id !== id);
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

