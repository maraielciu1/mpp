import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);


    return showSearch && visible ? (
        <div className='border-t border-b border-gray-200 py-4 text-center'>
            <div className='flex items-center justify-center gap-5'>
                {/* Search input and icon */}
                <div className='flex items-center gap-2 border border-gray-400 px-5 py-3 rounded-full w-[300px] sm:w-[400px]'>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type='text'
                        placeholder='Search'
                        className='flex-1 outline-none bg-inherit text-sm'
                    />
                    <img src={assets.searchIcon} alt='search' className='w-4' />
                </div>

                {/* Close icon */}
                <img
                    onClick={() => setShowSearch(false)}
                    src={assets.closeIcon}
                    alt='close'
                    className='w-4 cursor-pointer'
                />
            </div>
        </div>
    ) : null;
};

export default SearchBar;
