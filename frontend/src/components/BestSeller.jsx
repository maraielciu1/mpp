import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import {
    useState, useEffect
} from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestProduct, setBestSeller] = useState([]);
    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller == true));
        setBestSeller(bestProduct.slice(0, 3));
    }, [])
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-5'>
                <Title text1={'Best'} text2={'Sellers'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Check out our best selling products. Every item is carefully crafted to suit your style.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 gap-4 gap-y-6'>
                {
                    bestProduct.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
