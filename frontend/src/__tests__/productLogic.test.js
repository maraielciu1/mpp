import { describe, test, expect, beforeEach, vi } from 'vitest';
import { addProduct, updateProduct, deleteProduct } from '../assets/productOperations';

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
