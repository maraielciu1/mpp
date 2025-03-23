import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets, imageOptions } from '../assets/assets';
import toast from 'react-hot-toast';

const categories = ['Men', 'Women', 'Kids'];
const subCategories = ['Topwear', 'Bottomwear', 'Outerwear'];
const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];

const Crud = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useContext(ShopContext);
    const [newProduct, setNewProduct] = useState({
        image: '',
        name: '',
        description: '',
        price: '',
        category: '',
        subCategory: '',
        sizes: [],
        bestseller: false
    });

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [errors, setErrors] = useState({});

    const validate = (product) => {
        const newErrors = {};
        if (!product.name || product.name.length < 3) newErrors.name = 'Name too short';
        if (!product.description || product.description.length < 10) newErrors.description = 'Description too short';
        if (!product.price || isNaN(product.price) || product.price <= 0) newErrors.price = 'Invalid price';
        if (!product.category || !categories.includes(product.category)) {
            newErrors.category = 'Invalid or missing category';
        }

        if (!product.subCategory || !subCategories.includes(product.subCategory)) {
            newErrors.subCategory = 'Invalid or missing subcategory';
        }

        if (!product.sizes || product.sizes.length === 0) newErrors.sizes = 'At least one size required';

        return newErrors;
    };

    const handleAdd = () => {
        const validation = validate(newProduct);
        if (Object.keys(validation).length > 0) return setErrors(validation);
        addProduct({ ...newProduct, image: assets[newProduct.image] });
        setNewProduct({ image: '', name: '', description: '', price: '', category: '', subCategory: '', sizes: [], bestseller: false });
        setErrors({});
        toast.success('Product added successfully');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteProduct(id);
            toast.success('Product deleted successfully');
        }
    };

    const startEdit = (product) => {
        setEditingId(product._id);
        setEditData({ ...product });
    };

    const handleUpdate = () => {
        const validation = validate(editData);
        if (Object.keys(validation).length > 0) return setErrors(validation);
        updateProduct(editingId, editData);
        setEditingId(null);
        setEditData({});
        setErrors({});
        toast.success('Product updated successfully');
    };

    return (
        <div className='p-6 max-w-4xl mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Add Product</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
                <select value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} className='border p-2'>
                    <option value=''>Select Image</option>
                    {imageOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder='Name' className='border p-2' />
                {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}

                <input value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder='Description' className='border p-2 col-span-2' />
                {errors.description && <p className='text-red-500 text-sm col-span-2'>{errors.description}</p>}

                <input type='number' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} placeholder='Price' className='border p-2' />
                {errors.price && <p className='text-red-500 text-sm'>{errors.price}</p>}

                <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className='border p-2'>
                    <option value=''>Select Category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <p className='text-red-500 text-sm'>{errors.category}</p>}

                <select value={newProduct.subCategory} onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })} className='border p-2'>
                    <option value=''>Select Subcategory</option>
                    {subCategories.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.subCategory && <p className='text-red-500 text-sm'>{errors.subCategory}</p>}

                <div className='col-span-2 flex gap-2 flex-wrap'>
                    {availableSizes.map(size => (
                        <label key={size} className='flex items-center gap-1'>
                            <input
                                type='checkbox'
                                checked={newProduct.sizes.includes(size)}
                                onChange={() => {
                                    const sizes = newProduct.sizes.includes(size)
                                        ? newProduct.sizes.filter(s => s !== size)
                                        : [...newProduct.sizes, size];
                                    setNewProduct({ ...newProduct, sizes });
                                }}
                            />{size}
                        </label>
                    ))}
                    {errors.sizes && <p className='text-red-500 text-sm col-span-2'>{errors.sizes}</p>}

                </div>
            </div>
            <button onClick={handleAdd} className='bg-black text-white px-4 py-2 mb-10 rounded'>Add Product</button>

            <h2 className='text-xl font-semibold mb-4'>Product List</h2>
            {products.map(p => (
                <div key={p._id} className='border-b py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                    <div className='flex items-start gap-4 w-full'>
                        <img src={p.image} alt={p.name} className='w-20 h-20 object-cover rounded' />
                        {editingId === p._id ? (
                            <div className='flex flex-col gap-2 w-full'>
                                <input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className='border p-1' />
                                <input value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className='border p-1' />
                                <input type='number' value={editData.price} onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })} className='border p-1' />
                                <select value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} className='border p-1'>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <select value={editData.subCategory} onChange={(e) => setEditData({ ...editData, subCategory: e.target.value })} className='border p-1'>
                                    {subCategories.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <div className='flex gap-2 flex-wrap'>
                                    {availableSizes.map(size => (
                                        <label key={size} className='flex items-center gap-1'>
                                            <input
                                                type='checkbox'
                                                checked={editData.sizes.includes(size)}
                                                onChange={() => {
                                                    const sizes = editData.sizes.includes(size)
                                                        ? editData.sizes.filter(s => s !== size)
                                                        : [...editData.sizes, size];
                                                    setEditData({ ...editData, sizes });
                                                }}
                                            />{size}
                                        </label>
                                    ))}
                                </div>
                                <button onClick={handleUpdate} className='bg-blue-600 text-white px-3 py-1 rounded'>Save</button>
                            </div>
                        ) : (
                            <div className='flex-1'>
                                <p className='font-medium'>{p.name}</p>
                                <p className='text-sm text-gray-600'>${p.price}</p>
                                <p className='text-xs text-gray-500'>{p.description}</p>
                                <p className='text-xs text-gray-400'>{p.category} / {p.subCategory}</p>
                                <p className='text-xs text-gray-500'>Sizes: {p.sizes.join(', ')}</p>
                            </div>
                        )}
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={() => handleDelete(p._id)} className='text-red-600 text-sm'>Delete</button>
                        {editingId !== p._id && (
                            <button onClick={() => startEdit(p)} className='text-blue-600 text-sm'>Edit</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Crud;