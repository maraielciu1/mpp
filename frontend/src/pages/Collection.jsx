import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [type, setType] = useState([]);
    const [sortType, setSortType] = useState('relevance');

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));

        }
        else {
            setCategory(prev => [...prev, e.target.value]);
        }
    }

    const toggleType = (e) => {
        if (type.includes(e.target.value)) {
            setType(prev => prev.filter(item => item !== e.target.value));
        }
        else {
            setType(prev => [...prev, e.target.value]);
        }
    }

    const applyFilter = () => {
        let tempProducts = products.slice();
        if (showSearch && search) {
            tempProducts = tempProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (category.length > 0) {
            tempProducts = tempProducts.filter(item => category.includes(item.category));
        }
        if (type.length > 0) {
            tempProducts = tempProducts.filter(item => type.includes(item.subCategory));
        }
        setFilterProducts(tempProducts);
    }

    const sortProducts = () => {
        let tempProducts = filterProducts.slice();
        if (sortType === 'low-high') {
            setFilterProducts(tempProducts.sort((a, b) => (a.price - b.price)));
        }
        else if (sortType === 'high-low') {
            setFilterProducts(tempProducts.sort((a, b) => (b.price - a.price)));
        }
        else {
            applyFilter();
        }
    }

    useEffect(() => {
        applyFilter();
    }, [category, type, search, showSearch])

    useEffect(() => {
        sortProducts();
    }, [sortType])


    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200'>
            {/* filters */}
            <div className='min-w-60'>
                <p className='my-2 text-xl flex items-center gap-2 cursor-pointer'>
                    FILTERS
                </p>
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>
                        CATEGORIES
                    </p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Men
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
                        </p>
                    </div>
                </div>
                {/* subfilters */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>
                        TYPE
                    </p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleType} />Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleType} />Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Outerwear'} onChange={toggleType} />Outerwear
                        </p>
                    </div>
                </div>
            </div>

            {/* product list */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'All'} text2={'Collections'} />
                    {/* sorting */}
                    <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 px-3 py-1 rounded-sm text-sm font-light text-gray-700'>
                        <option value="relevance">Sort by relevance</option>
                        <option value="low-high">Sort by Low to High</option>
                        <option value="high-low">Sort by High to Low</option>
                    </select>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 gap-4 gap-y-6'>
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection
