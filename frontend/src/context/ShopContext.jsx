import React, { createContext, useState, useEffect } from 'react';
import { products as initialProducts, assets } from '../assets/assets';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('products');
        if (saved) {
            setProducts(JSON.parse(saved));
        } else {
            const withKeys = initialProducts.map(product => ({
                ...product,
                image: Array.isArray(product.image) ? product.image[0] : product.image
            }));
            setProducts(withKeys);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (newProduct) => {
        setProducts(prev => [...prev, { ...newProduct, _id: Date.now() }]);
    };

    const updateProduct = (id, updatedData) => {
        setProducts(prev =>
            prev.map(p => (p._id === id ? { ...p, ...updatedData } : p))
        );
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p._id !== id));
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