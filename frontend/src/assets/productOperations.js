export const addProduct = (list, newProduct) => [
    ...list,
    { ...newProduct, _id: Date.now() },
];

export const updateProduct = (list, id, updatedData) =>
    list.map(p => (p._id === id ? { ...p, ...updatedData } : p));

export const deleteProduct = (list, id) =>
    list.filter(p => p._id !== id);
