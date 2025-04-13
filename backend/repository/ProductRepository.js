import { initialProducts } from '../data/ProductData.js';

class ProductRepository {
    constructor() {
        this.products = [...initialProducts];
    }

    reset() {
        this.products = [...initialProducts];
    }

    getAll(filters = {}, sort = '') {
        this.reset();
        let result = [...this.products];

        if (filters.category) {
            result = result.filter(p => p.category === filters.category);
        }
        if (filters.subCategory) {
            result = result.filter(p => p.subCategory === filters.subCategory);
        }

        if (sort === 'price_asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sort === 'price_desc') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }

    getById(id) {
        return this.products.find(p => p._id === id);
    }

    add(product) {
        this.products.push(product);
        return product;
    }

    update(id, updatedData) {
        const index = this.products.findIndex(p => p._id === id);
        if (index === -1) return null;
        this.products[index] = { ...this.products[index], ...updatedData };
        return this.products[index];
    }

    delete(id) {
        const initialLength = this.products.length;
        this.products = this.products.filter(p => p._id !== id);
        return this.products.length < initialLength;
    }
}

export const productRepo = new ProductRepository();