import { productRepo } from '../repository/ProductRepository.js';

export const ProductService = {
    getAll: (filters, sort) => productRepo.getAll(filters, sort),
    getById: (id) => productRepo.getById(id),
    add: (data) => productRepo.add({ ...data, _id: Date.now() }),
    update: (id, data) => productRepo.update(id, data),
    delete: (id) => productRepo.delete(id)
};
