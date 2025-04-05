// context/ShopContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:4000/products');
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product) => {
        try {
            const res = await axios.post('http://localhost:4000/products', product);
            setProducts(prev => [...prev, res.data]);
        } catch (err) {
            console.error("Failed to add product", err);
        }
    };

    const updateProduct = async (id, data) => {
        try {
            const res = await axios.patch(`http://localhost:4000/products/${id}`, data);
            setProducts(prev => prev.map(p => p._id === id ? res.data : p));
        } catch (err) {
            console.error("Failed to update product", err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/products/${id}`);
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            console.error("Failed to delete product", err);
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
                setShowSearch
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
