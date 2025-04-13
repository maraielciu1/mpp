export function validateProduct(data) {
    const requiredFields = ['name', 'description', 'price', 'image', 'category', 'subCategory', 'sizes', 'bestseller'];

    for (let field of requiredFields) {
        if (!(field in data)) {
            return `Missing required field: ${field}`;
        }
    }

    if (typeof data.name !== 'string') return 'Invalid type for name';
    if (typeof data.description !== 'string') return 'Invalid type for description';
    if (typeof data.price !== 'number' || data.price < 0) return 'Invalid price';
    if (!Array.isArray(data.image) || data.image !== 'string') return 'Image must be an array';
    if (typeof data.category !== 'string') return 'Invalid category';
    if (typeof data.subCategory !== 'string') return 'Invalid subCategory';
    if (!Array.isArray(data.sizes)) return 'Sizes must be an array';
    if (typeof data.bestseller !== 'boolean') return 'Invalid type for bestseller';
    return null;
}
