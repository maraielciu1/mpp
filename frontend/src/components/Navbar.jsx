import React from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = ({ onLogout }) => {
    const [visible, setVisible] = React.useState(false);
    const { setShowSearch } = React.useContext(ShopContext);
    const user = JSON.parse(localStorage.getItem('activeUser'));
    const isAdmin = user?.is_admin;

    return (
        <div className='flex justify-between items-center py-5 font-medium'>
            <Link to='/'><img src={assets.logo} alt="logo" className='w-40' /></Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />
                </NavLink>
                <NavLink to='/crud' className='flex flex-col items-center gap-1'>
                    <p>MyCloset</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                {/* <NavLink to='/upload' className='flex flex-col items-center gap-1'>
                    <p>File Transfer</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink> */}
                {isAdmin && <NavLink to='/admin' className='flex flex-col items-center gap-1'>Admin Dashboard</NavLink>}
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} src={assets.searchIcon} alt="search" className='w-5 cursor-pointer' />
                <div className='group relative'>
                    <img src={assets.profileIcon} alt="" className='w-5 cursor-pointer' />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={onLogout} className='cursor-pointer hover:text-black'>Log Out</p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.bagIcon} alt="bag" className='w-5 cursor-pointer' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 text-xs text-white bg-black rounded-full'>2</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menuIcon} alt="menu" className='w-5 cursor-pointer sm:hidden' />
            </div>

            {/* Mobile Menu */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-700'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-4 cursor-pointer'>
                        <img src={assets.closeIcon} alt="close" className='h-4 rotate-180' />
                        <p>Close</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to='/' className='py-2 pl-6 border'>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collection' className='py-2 pl-6 border'>Collection</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/crud' className='py-2 pl-6 border'>Crud</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/upload' className='py-2 pl-6 border'>File Transfer</NavLink>
                    <p onClick={() => { setVisible(false); onLogout(); }} className='py-2 pl-6 border cursor-pointer hover:text-black'>Log Out</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
