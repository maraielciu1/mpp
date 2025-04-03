import { describe, test, expect, beforeEach, vi } from 'vitest';
import { addProduct, updateProduct, deleteProduct } from '../assets/productOperations';
const filterProducts = (products, selectedCategories = [], selectedSubCategories = []) => {
    return products.filter(product => {
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(product.category);

        const matchesSubCategory =
            selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategory);

        return matchesCategory && matchesSubCategory;
    });
};

describe('productOperations logic', () => {
    let products;

    beforeEach(() => {
        products = [
            { _id: 1, name: 'Shirt', price: 30 },
            { _id: 2, name: 'Jeans', price: 60 },
        ];
    });

    test('addProduct adds a new item', () => {
        const newProduct = { name: 'Hat', price: 20 };
        const updated = addProduct(products, newProduct);

        expect(updated.length).toBe(3);
        expect(updated[2].name).toBe('Hat');
        expect(updated[2]).toHaveProperty('_id');
    });

    test('updateProduct updates only the matching item', () => {
        const updated = updateProduct(products, 1, { name: 'Updated Shirt', price: 35 });

        expect(updated[0].name).toBe('Updated Shirt');
        expect(updated[0].price).toBe(35);
        expect(updated[1].name).toBe('Jeans');
    });

    test('deleteProduct removes the correct item', () => {
        const updated = deleteProduct(products, 1);

        expect(updated.length).toBe(1);
        expect(updated[0]._id).toBe(2);
    });
});
describe('Product filtering', () => {
    const products = [
        { _id: 1, name: 'Shirt', category: 'Men', subCategory: 'Topwear' },
        { _id: 2, name: 'Jeans', category: 'Men', subCategory: 'Bottomwear' },
        { _id: 3, name: 'Dress', category: 'Women', subCategory: 'Topwear' },
        { _id: 4, name: 'Jacket', category: 'Women', subCategory: 'Outerwear' }
    ];

    test('filters by category', () => {
        const result = filterProducts(products, ['Women']);
        expect(result.length).toBe(2);
        expect(result.every(p => p.category === 'Women')).toBe(true);
    });

    test('filters by subCategory', () => {
        const result = filterProducts(products, [], ['Topwear']);
        expect(result.length).toBe(2);
        expect(result.every(p => p.subCategory === 'Topwear')).toBe(true);
    });

    test('filters by category and subCategory', () => {
        const result = filterProducts(products, ['Women'], ['Topwear']);
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Dress');
    });
});
