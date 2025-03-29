import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price, priceClass }) => {
    const { currency } = useContext(ShopContext);

    const resolvedImage = Array.isArray(image) ? image[0] : image;

    return (
        <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
            <div className='overflow-hidden rounded-lg shadow-lg'>
                <img src={resolvedImage} alt={name} className='hover:scale-110 transition ease-in-out' />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className={`text-sm font-medium ${priceClass}`}>
                {currency}{price}
            </p>
        </Link>
    );
};

export default ProductItem;
