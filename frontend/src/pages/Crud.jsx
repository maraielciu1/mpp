// import React, { useContext, useState, useEffect } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import toast from 'react-hot-toast';
// import {
//     BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
// } from 'recharts';
// import AvgProductsStat from '../components/AvgProductsStat';

// const categories = ['Men', 'Women', 'Kids'];
// const subCategories = ['Topwear', 'Bottomwear', 'Outerwear'];
// const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];

// const Crud = () => {
//     const { products, setProducts, addProduct, updateProduct, deleteProduct, status, fetchProducts } = useContext(ShopContext);
//     const [newProduct, setNewProduct] = useState({
//         image: '',
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         subCategory: '',
//         sizes: [],
//         bestseller: false
//     });
//     const [categoryData, setCategoryData] = useState([]);
//     const [subCategoryData, setSubCategoryData] = useState([]);
//     const [priceData, setPriceData] = useState([]);
//     const [generating, setGenerating] = useState(false);
//     const [generationFinished, setGenerationFinished] = useState(false);

//     const statusColor = {
//         online: 'bg-green-200 text-green-800',
//         offline: 'bg-yellow-200 text-yellow-800',
//         'server-down': 'bg-red-200 text-red-800',
//         checking: 'bg-gray-200 text-gray-800'
//     };

//     const statusText = {
//         online: '🟢 Online',
//         offline: '🟡 Offline (changes will sync later)',
//         'server-down': '🔴 Server Down',
//         checking: '⚪ Checking server...'
//     };

//     useEffect(() => {
//         const socket = new WebSocket('ws://localhost:8080');
//         socket.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             if (data.type === 'new_product') {
//                 setProducts(prev => [...prev, data.payload]);
//                 toast.success('Real-time product added');
//             }
//             if (data.type === 'generation_finished') {
//                 setGenerating(false);
//                 setGenerationFinished(true);
//                 toast.success('Generation completed');
//             }
//         };
//         return () => socket.close();
//     }, []);

//     useEffect(() => {
//         const categoryCount = {};
//         const subCategoryCount = {};
//         const priceBuckets = { '0–50': 0, '51–100': 0, '101+': 0 };
//         products.forEach(p => {
//             categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
//             subCategoryCount[p.subCategory] = (subCategoryCount[p.subCategory] || 0) + 1;
//             if (p.price <= 50) priceBuckets['0–50']++;
//             else if (p.price <= 100) priceBuckets['51–100']++;
//             else priceBuckets['101+']++;
//         });
//         setCategoryData(Object.entries(categoryCount).map(([name, value]) => ({ name, value })));
//         setSubCategoryData(Object.entries(subCategoryCount).map(([name, value]) => ({ name, value })));
//         setPriceData(Object.entries(priceBuckets).map(([name, value]) => ({ name, value })));
//     }, [products]);

//     const [editingId, setEditingId] = useState(null);
//     const [editData, setEditData] = useState({});
//     const [errors, setErrors] = useState({});

//     const validate = (product) => {
//         const newErrors = {};
//         if (!product.name || product.name.length < 3) newErrors.name = 'Name too short';
//         if (!product.description || product.description.length < 10) newErrors.description = 'Description too short';
//         if (!product.price || isNaN(product.price) || product.price <= 0) newErrors.price = 'Invalid price';
//         if (!product.category || !categories.includes(product.category)) newErrors.category = 'Invalid or missing category';
//         if (!product.subCategory || !subCategories.includes(product.subCategory)) newErrors.subCategory = 'Invalid or missing subcategory';
//         if (!product.sizes || product.sizes.length === 0) newErrors.sizes = 'At least one size required';
//         if (!product.image || typeof product.image !== 'string' || !product.image.startsWith('http')) newErrors.image = 'Image must be a valid URL';
//         return newErrors;
//     };

//     const handleAdd = async () => {
//         const validation = validate(newProduct);
//         if (Object.keys(validation).length > 0) return setErrors(validation);
//         addProduct({ ...newProduct, image: [newProduct.image] });
//         await fetchProducts();
//         setNewProduct({ image: '', name: '', description: '', price: '', category: '', subCategory: '', sizes: [], bestseller: false });
//         setErrors({});
//         toast.success('Product added successfully');
//     };

//     const handleDelete = (id) => {
//         if (window.confirm('Are you sure you want to delete this item?')) {
//             deleteProduct(id);
//             toast.success('Product deleted successfully');
//         }
//     };

//     const startEdit = (product) => {
//         setEditingId(product.id);
//         setEditData({
//             ...product,
//             image: product.image[0],
//             price: String(product.price)
//         });
//     };

//     const handleUpdate = async () => {
//         const validation = validate(editData);
//         if (Object.keys(validation).length > 0) return setErrors(validation);

//         try {
//             await updateProduct(editingId, {
//                 ...editData,
//                 image: [editData.image],
//                 price: Number(editData.price)
//             });
//             await fetchProducts();
//             toast.success('Product updated successfully');
//         } catch {
//             toast.error('Failed to update product');
//         }

//         setEditingId(null);
//         setEditData({});
//         setErrors({});
//     };


//     const handleStartGeneration = async () => {
//         try {
//             await fetch('http://localhost:4000/start-generation');
//             toast.success('Started generating products');
//             setGenerating(true);
//             setGenerationFinished(false);
//         } catch {
//             toast.error('Failed to start generation');
//         }
//     };

//     const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

//     return (
//         <div className='p-6 max-w-4xl mx-auto'>
//             <AvgProductsStat />
//             <div className={`p-2 mb-4 rounded text-center font-medium ${statusColor[status]}`}>{statusText[status]}</div>

//             <div className='flex justify-between items-center mb-6'>
//                 <h3 className="text-xl font-bold">Live Product Stats</h3>
//                 <button
//                     onClick={handleStartGeneration}
//                     className='bg-purple-600 text-white px-3 py-1 rounded'
//                     disabled={generating}
//                 >
//                     {generationFinished ? 'Generation Finished' : generating ? 'Generating...' : 'Start Generator'}
//                 </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//                 <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                         <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80} label>
//                             {categoryData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                         <Legend />
//                     </PieChart>
//                 </ResponsiveContainer>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={subCategoryData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis allowDecimals={false} />
//                         <Tooltip />
//                         <Bar dataKey="value" fill="#82ca9d" name="Subcategory Count" label />
//                     </BarChart>
//                 </ResponsiveContainer>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={priceData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" label={{ value: 'Price Range', position: 'insideBottom', offset: -5, dy: -2 }} />
//                         <YAxis allowDecimals={false} label={{ value: '# of Products', angle: -90, position: 'insideLeft' }} />
//                         <Tooltip />
//                         <Bar dataKey="value" fill="#ffc658" name="Products per Price Range" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>

//             <h2 className='text-2xl font-bold mb-4'>Add Product</h2>
//             <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
//                 <input type='text' value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} placeholder='Image URL' className='border p-2' />
//                 {errors.image && <p className='text-red-500 text-sm'>{errors.image}</p>}
//                 <input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder='Name' className='border p-2' />
//                 {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
//                 <input value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder='Description' className='border p-2 col-span-2' />
//                 {errors.description && <p className='text-red-500 text-sm col-span-2'>{errors.description}</p>}
//                 <input type='number' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} placeholder='Price' className='border p-2' />
//                 {errors.price && <p className='text-red-500 text-sm'>{errors.price}</p>}
//                 <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className='border p-2'>
//                     <option value=''>Select Category</option>
//                     {categories.map(c => <option key={c} value={c}>{c}</option>)}
//                 </select>
//                 {errors.category && <p className='text-red-500 text-sm'>{errors.category}</p>}
//                 <select value={newProduct.subCategory} onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })} className='border p-2'>
//                     <option value=''>Select Subcategory</option>
//                     {subCategories.map(s => <option key={s} value={s}>{s}</option>)}
//                 </select>
//                 {errors.subCategory && <p className='text-red-500 text-sm'>{errors.subCategory}</p>}
//                 <div className='col-span-2 flex gap-2 flex-wrap'>
//                     {availableSizes.map(size => (
//                         <label key={size} className='flex items-center gap-1'>
//                             <input
//                                 type='checkbox'
//                                 checked={newProduct.sizes.includes(size)}
//                                 onChange={() => {
//                                     const sizes = newProduct.sizes.includes(size)
//                                         ? newProduct.sizes.filter(s => s !== size)
//                                         : [...newProduct.sizes, size];
//                                     setNewProduct({ ...newProduct, sizes });
//                                 }}
//                             />{size}
//                         </label>
//                     ))}
//                     {errors.sizes && <p className='text-red-500 text-sm col-span-2'>{errors.sizes}</p>}
//                 </div>
//             </div>
//             <button onClick={handleAdd} className='bg-black text-white px-4 py-2 mb-10 rounded'>Add Product</button>

//             <h2 className='text-xl font-semibold mb-4'>Product List</h2>
//             {products.map(p => (
//                 <div key={p.id} className='border-b py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
//                     <div className='flex items-start gap-4 w-full'>
//                         <img src={Array.isArray(p.image) ? p.image[0] : p.image} alt={p.name} className='w-20 h-20 object-cover rounded' />
//                         {editingId === p.id ? (
//                             <div className='flex flex-col gap-2 w-full'>
//                                 <input value={editData.image} onChange={(e) => setEditData({ ...editData, image: e.target.value })} className='border p-1' />
//                                 <input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className='border p-1' />
//                                 <input value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className='border p-1' />
//                                 <input type='number' value={editData.price} onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })} className='border p-1' />
//                                 <select value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} className='border p-1'>
//                                     {categories.map(c => <option key={c} value={c}>{c}</option>)}
//                                 </select>
//                                 <select value={editData.subCategory} onChange={(e) => setEditData({ ...editData, subCategory: e.target.value })} className='border p-1'>
//                                     {subCategories.map(s => <option key={s} value={s}>{s}</option>)}
//                                 </select>
//                                 <div className='flex gap-2 flex-wrap'>
//                                     {availableSizes.map(size => (
//                                         <label key={size} className='flex items-center gap-1'>
//                                             <input
//                                                 type='checkbox'
//                                                 checked={editData.sizes.includes(size)}
//                                                 onChange={() => {
//                                                     const sizes = editData.sizes.includes(size)
//                                                         ? editData.sizes.filter(s => s !== size)
//                                                         : [...editData.sizes, size];
//                                                     setEditData({ ...editData, sizes });
//                                                 }}
//                                             />{size}
//                                         </label>
//                                     ))}
//                                 </div>
//                                 <button onClick={handleUpdate} className='bg-blue-600 text-white px-3 py-1 rounded'>Save</button>
//                             </div>
//                         ) : (
//                             <div className='flex-1'>
//                                 <p className='font-medium'>{p.name}</p>
//                                 <p className='text-sm text-gray-600'>${p.price}</p>
//                                 <p className='text-xs text-gray-500'>{p.description}</p>
//                                 <p className='text-xs text-gray-400'>{p.category} / {p.subCategory}</p>
//                                 <p className='text-xs text-gray-500'>Sizes: {(p.sizes || []).join(', ')}</p>

//                             </div>
//                         )}
//                     </div>
//                     <div className='flex gap-2'>
//                         <button onClick={() => handleDelete(p.id)} className='text-red-600 text-sm'>Delete</button>
//                         {editingId !== p.id && (
//                             <button onClick={() => startEdit(p)} className='text-blue-600 text-sm'>Edit</button>
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Crud;
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext, BASE_URL } from '../context/ShopContext';
import toast from 'react-hot-toast';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import AvgProductsStat from '../components/AvgProductsStat';

const categories = ['Men', 'Women', 'Kids'];
const subCategories = ['Topwear', 'Bottomwear', 'Outerwear'];
const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];

const Crud = () => {
    const { products, addProduct, updateProduct, deleteProduct, status, fetchProducts } = useContext(ShopContext);
    const user = JSON.parse(localStorage.getItem('activeUser'));

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
        if (!product.category || !categories.includes(product.category)) newErrors.category = 'Invalid or missing category';
        if (!product.subCategory || !subCategories.includes(product.subCategory)) newErrors.subCategory = 'Invalid or missing subcategory';
        if (!product.sizes || product.sizes.length === 0) newErrors.sizes = 'At least one size required';
        if (!product.image || typeof product.image !== 'string' || !product.image.startsWith('http')) newErrors.image = 'Image must be a valid URL';
        return newErrors;
    };

    const handleAdd = async () => {
        const validation = validate(newProduct);
        if (Object.keys(validation).length > 0) return setErrors(validation);
        await addProduct({ ...newProduct, image: [newProduct.image], user_id: user.id });
        await fetchProducts();
        setNewProduct({ image: '', name: '', description: '', price: '', category: '', subCategory: '', sizes: [], bestseller: false });
        setErrors({});
        toast.success('Product added successfully');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            await deleteProduct(id);
            toast.success('Product deleted successfully');
        }
    };

    const startEdit = (product) => {
        setEditingId(product.id);
        setEditData({ ...product, image: product.image[0], price: String(product.price) });
    };

    const handleUpdate = async () => {
        const validation = validate(editData);
        if (Object.keys(validation).length > 0) return setErrors(validation);
        await updateProduct(editingId, { ...editData, image: [editData.image], price: Number(editData.price) });
        await fetchProducts();
        setEditingId(null);
        setEditData({});
        setErrors({});
        toast.success('Product updated successfully');
    };

    const userProducts = products.filter(p => p.user_id === user.id);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <AvgProductsStat />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Your Products</h2>
            </div>

            <h2 className='text-xl font-semibold mb-4'>Add Product</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
                <input type='text' value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} placeholder='Image URL' className='border p-2' />
                {errors.image && <p className='text-red-500 text-sm'>{errors.image}</p>}
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

            <h2 className='text-xl font-semibold mb-4'>Your Product List</h2>
            {userProducts.map(p => (
                <div key={p.id} className='border-b py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                    <div className='flex items-start gap-4 w-full'>
                        <img src={Array.isArray(p.image) ? p.image[0] : p.image} alt={p.name} className='w-20 h-20 object-cover rounded' />
                        {editingId === p.id ? (
                            <div className='flex flex-col gap-2 w-full'>
                                <input value={editData.image} onChange={(e) => setEditData({ ...editData, image: e.target.value })} className='border p-1' />
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
                                <p className='text-xs text-gray-500'>Sizes: {(p.sizes || []).join(', ')}</p>
                            </div>
                        )}
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={() => handleDelete(p.id)} className='text-red-600 text-sm'>Delete</button>
                        {editingId !== p.id && (
                            <button onClick={() => startEdit(p)} className='text-blue-600 text-sm'>Edit</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Crud;
