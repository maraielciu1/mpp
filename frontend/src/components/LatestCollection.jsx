import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'


const LatestCollection = () => {

    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 4));
    }, [])

    return (
        <div className='my-10'>
            <div className='text-center text-3xl font-bold'>
                <Title text1={'Latest'} text2={'Collection'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Check out our latest collection of products. Every item is carefully crafted to suit your style.
                </p>
            </div>

            {/* rendering products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollection
