import React from 'react';
import { describe, test, expect, render, screen } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ShopContext, default as ShopContextProvider } from '../context/ShopContext';

// A custom hook to access the context
const useShopContext = () => {
    return renderHook(() => React.useContext(ShopContext), {
        wrapper: ShopContextProvider,
    });
};

describe('ShopContext logic', () => {
    test('adds a product', () => {
        const { result } = useShopContext();

        const newProduct = {
            name: 'Test Product',
            description: 'Nice one',
            price: 42,
            category: 'Men',
            subCategory: 'Topwear',
            sizes: ['M'],
            image: 'p_img1',
        };

        act(() => {
            result.current.addProduct(newProduct);
        });

        const lastProduct = result.current.products.at(-1);
        expect(lastProduct.name).toBe('Test Product');
        expect(lastProduct).toHaveProperty('_id');
    });

    test('updates a product', () => {
        const { result } = useShopContext();

        const existingId = result.current.products[0]._id;

        act(() => {
            result.current.updateProduct(existingId, { name: 'Updated Name' });
        });

        const updated = result.current.products.find(p => p._id === existingId);
        expect(updated.name).toBe('Updated Name');
    });

    test('deletes a product', () => {
        const { result } = useShopContext();
        const initialLength = result.current.products.length;
        const idToDelete = result.current.products[0]._id;

        act(() => {
            result.current.deleteProduct(idToDelete);
        });

        const found = result.current.products.find(p => p._id === idToDelete);
        expect(result.current.products.length).toBe(initialLength - 1);
        expect(found).toBeUndefined();
    });
});
