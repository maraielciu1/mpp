import React, { createContext, useState } from 'react';
import { products as initialProducts } from '../assets/assets';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState(
        initialProducts.map(product => ({
            ...product,
            image: Array.isArray(product.image) ? product.image[0] : product.image
        }))
    );

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

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
