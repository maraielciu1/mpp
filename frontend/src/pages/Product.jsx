import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {
    const { productId } = useParams();
    const { products, currency } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [offerValue, setOfferValue] = useState('');
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const id = Number(productId);
        const foundProduct = products.find(item => item.id === id);
        if (foundProduct) {
            setProductData(foundProduct);
            setImage(foundProduct.image[0]);
            setOffers([]); // clear or load saved offers here if using localStorage/server
        }
    }, [productId, products]);

    const handleSubmitOffer = (e) => {
        e.preventDefault();
        const offer = parseFloat(offerValue);
        if (isNaN(offer) || offer <= 0) {
            alert('Enter a valid offer amount');
            return;
        }
        const newOffers = [...offers, offer];
        setOffers(newOffers);
        setOfferValue('');
    };

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex flex-col sm:flex-row gap-6'>
                {/* Side thumbnails */}
                <div className='w-full sm:w-20 flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto'>
                    {Array.isArray(productData.image) &&
                        productData.image.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt=''
                                onClick={() => setImage(img)}
                                className={`cursor-pointer w-20 h-20 object-cover rounded border ${image === img ? 'border-black' : 'border-gray-200'}`}
                            />
                        ))}
                </div>

                {/* Main image */}
                <div className='flex-1 flex justify-center items-center'>
                    <img src={image} alt='' className='w-full max-w-xl h-auto object-contain rounded shadow-md' />
                </div>

                {/* Info + Offer Section */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        {[...Array(4)].map((_, i) => (
                            <img key={i} src={assets.fullStarIcon} alt="" className="w-3.5" />
                        ))}
                        <img src={assets.starIcon} alt="" className="w-3.5" />
                        <p className='pl-2'>(122)</p>
                    </div>

                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='mt-5 text-gray-500'>{productData.description}</p>

                    {/* Offer input */}
                    <div className='mt-8'>
                        <h3 className='font-semibold mb-2'>Make an Offer</h3>
                        <form onSubmit={handleSubmitOffer} className='flex gap-2'>
                            <input
                                type='number'
                                step='0.01'
                                value={offerValue}
                                onChange={(e) => setOfferValue(e.target.value)}
                                className='border px-3 py-1 rounded w-full'
                                placeholder='Enter your offer'
                            />
                            <button
                                type='submit'
                                className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700'
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Offers list */}
                    {offers.length > 0 && (
                        <div className='mt-6'>
                            <h4 className='font-semibold mb-2'>Offers Received:</h4>
                            <ul className='list-disc list-inside text-gray-700 text-sm'>
                                {offers.map((offer, index) => (
                                    <li key={index}>{currency}{offer.toFixed(2)}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div className='opacity-0'>Loading...</div>
    );
};

export default Product;
