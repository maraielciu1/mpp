import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import axios from 'axios';

const Collection = () => {
    const { search, showSearch } = useContext(ShopContext);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [showFilter, setShowFilter] = useState(false);
    const [category, setCategory] = useState([]);
    const [type, setType] = useState([]);
    const [sortType, setSortType] = useState('relevance');

    const loadMoreProducts = async () => {
        if (!hasMore || isLoading) return;
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:4000/products?page=${page}&limit=20`);
            const newData = res.data.map(p => ({ ...p, image: Array.isArray(p.image) ? p.image : [p.image] }));
            setProducts(prev => [...prev, ...newData]);
            setHasMore(res.data.length > 0);
            setPage(prev => prev + 1);
        } catch (err) {
            console.error('Failed to load products', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMoreProducts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
            if (nearBottom) {
                loadMoreProducts();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, page]);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    const toggleType = (e) => {
        if (type.includes(e.target.value)) {
            setType(prev => prev.filter(item => item !== e.target.value));
        } else {
            setType(prev => [...prev, e.target.value]);
        }
    };

    const filtered = products.filter(item => {
        return (
            (!showSearch || !search || item.name.toLowerCase().includes(search.toLowerCase())) &&
            (category.length === 0 || category.includes(item.category)) &&
            (type.length === 0 || type.includes(item.subCategory))
        );
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortType === 'low-high') return a.price - b.price;
        if (sortType === 'high-low') return b.price - a.price;
        return 0;
    });

    const prices = sorted.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const medianPrice = prices.length ? prices.slice().sort((a, b) => a - b)[Math.floor(prices.length / 2)] : 0;

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200'>
            {/* filters */}
            <div className='min-w-60'>
                <p className='my-2 text-xl flex items-center gap-2 cursor-pointer'>FILTERS</p>
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        {['Men', 'Women', 'Kids'].map(cat => (
                            <p className='flex gap-2' key={cat}>
                                <input className='w-3' type="checkbox" value={cat} onChange={toggleCategory} />{cat}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        {['Topwear', 'Bottomwear', 'Outerwear'].map(typeOpt => (
                            <p className='flex gap-2' key={typeOpt}>
                                <input className='w-3' type="checkbox" value={typeOpt} onChange={toggleType} />{typeOpt}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* product list */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'All'} text2={'Collections'} />
                    <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 px-3 py-1 rounded-sm text-sm font-light text-gray-700'>
                        <option value="relevance">Sort by relevance</option>
                        <option value="low-high">Sort by Low to High</option>
                        <option value="high-low">Sort by High to Low</option>
                    </select>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 gap-y-6'>
                    {sorted.map((item, index) => {
                        let priceClass = 'text-gray-800';
                        if (item.price === minPrice) priceClass = 'text-green-600';
                        else if (item.price === maxPrice) priceClass = 'text-red-600';
                        else if (item.price === medianPrice) priceClass = 'text-yellow-600';

                        return (
                            <ProductItem
                                key={item._id || index}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                priceClass={priceClass}
                            />
                        );
                    })}
                </div>
                {isLoading && (
                    <div className='flex justify-center items-center py-8'>
                        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500'></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Collection;