import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import axios from 'axios';

const Product = () => {
    const { productId } = useParams();
    const { products, currency } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [offerValue, setOfferValue] = useState('');
    const [offers, setOffers] = useState([]);
    const [acceptedOfferEmail, setAcceptedOfferEmail] = useState('');
    const user = JSON.parse(localStorage.getItem('activeUser'));

    const fetchProductFromServer = async (id) => {
        try {
            const res = await axios.get(`http://localhost:4000/products/${id}`);
            const data = res.data;
            if (data) {
                const normalized = {
                    ...data,
                    image: Array.isArray(data.image) ? data.image : [data.image]
                };
                setProductData(normalized);
                setImage(normalized.image[0]);
                fetchOffers(normalized.id);
            }
        } catch (err) {
            console.error('Failed to fetch product from server:', err);
        }
    };

    const fetchOffers = async (id) => {
        try {
            const res = await axios.get(`http://localhost:4000/offers/${id}`);
            setOffers(res.data);
        } catch (err) {
            console.error('Failed to fetch offers', err);
        }
    };

    useEffect(() => {
        const id = Number(productId);
        if (!id) return;

        const fromContext = products.find(p => p.id === id);
        if (fromContext) {
            const normalized = {
                ...fromContext,
                image: Array.isArray(fromContext.image) ? fromContext.image : [fromContext.image]
            };
            setProductData(normalized);
            setImage(normalized.image[0]);
            fetchOffers(normalized.id);
        } else {
            fetchProductFromServer(id);
        }
    }, [productId, products]);

    const handleSubmitOffer = async (e) => {
        e.preventDefault();
        const amount = parseFloat(offerValue);
        if (isNaN(amount) || amount <= 0) {
            alert('Enter a valid offer amount');
            return;
        }
        try {
            await axios.post('http://localhost:4000/offers', {
                product_id: productData.id,
                sender_id: user.id,
                amount
            });
            setOfferValue('');
            fetchOffers(productData.id);
        } catch (err) {
            console.error('Failed to submit offer:', err);
        }
    };

    const handleAccept = async (offerId) => {
        try {
            const res = await axios.post(`http://localhost:4000/offers/${offerId}/accept`);
            setAcceptedOfferEmail(res.data.email);
            alert(`Offer accepted. Contact the buyer at: ${res.data.email}`);
            fetchOffers(productData.id);
        } catch (err) {
            console.error('Failed to accept offer:', err);
        }
    };

    const handleDecline = async (offerId) => {
        try {
            await axios.post(`http://localhost:4000/offers/${offerId}/decline`);
            fetchOffers(productData.id);
        } catch (err) {
            console.error('Failed to decline offer:', err);
        }
    };

    if (!productData) {
        return <div className='text-center mt-20 text-gray-600 text-lg'>Loading product data...</div>;
    }

    return (
        <div className='border-t-2 pt-10'>
            <div className='flex flex-col sm:flex-row gap-6'>

                {/* Thumbnails */}
                <div className='w-full sm:w-20 flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto'>
                    {productData.image.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt=''
                            onClick={() => setImage(img)}
                            className={`cursor-pointer w-20 h-20 object-cover rounded border ${image === img ? 'border-black' : 'border-gray-200'}`}
                        />
                    ))}
                </div>

                {/* Main Image */}
                <div className='flex-1 flex justify-center'>
                    <img src={image} alt='' className='w-full max-w-xl object-contain rounded' />
                </div>

                {/* Info Section */}
                <div className='flex-1'>
                    <h1 className='text-2xl font-semibold'>{productData.name}</h1>
                    <p className='mt-3 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='mt-5 text-gray-600'>{productData.description}</p>

                    {/* Offer Form */}
                    {user?.id !== productData.user_id && (
                        <div className='mt-8'>
                            <h3 className='font-semibold mb-2'>Make an Offer</h3>
                            <form onSubmit={handleSubmitOffer} className='flex gap-2'>
                                <input
                                    type='number'
                                    value={offerValue}
                                    onChange={(e) => setOfferValue(e.target.value)}
                                    className='border px-3 py-1 rounded w-full'
                                    placeholder='Enter offer amount'
                                />
                                <button type='submit' className='bg-blue-600 text-white px-4 py-1 rounded'>Submit</button>
                            </form>
                        </div>
                    )}

                    {/* Offers */}
                    {offers.length > 0 && (
                        <div className='mt-6'>
                            <h4 className='font-semibold mb-2'>Offers:</h4>
                            <ul className='space-y-2 text-sm'>
                                {offers.map(offer => (
                                    <li key={offer.id} className='border p-2 rounded flex justify-between items-center'>
                                        <span>
                                            💰 {currency}{Number(offer.amount).toFixed(2)} — from {offer.username}
                                        </span>
                                        {user?.id === productData.user_id && (
                                            <div className='flex gap-2'>
                                                <button
                                                    onClick={() => handleAccept(offer.id)}
                                                    className='text-green-600 font-medium'
                                                >Accept</button>
                                                <button
                                                    onClick={() => handleDecline(offer.id)}
                                                    className='text-red-600 font-medium'
                                                >Decline</button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Accepted Email */}
                    {acceptedOfferEmail && (
                        <div className='mt-4 text-green-700'>
                            You accepted an offer. Contact the buyer at: <strong>{acceptedOfferEmail}</strong>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
