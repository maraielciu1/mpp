import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Collection from './pages/collection';
import Crud from './pages/crud';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import { Toaster } from 'react-hot-toast';
import Product from './pages/Product';
import Orders from './pages/Orders';

const App = () => {
  return (
    <div className='px-4 sm: px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/product/:productId' element={<Product />} />
        {/* <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} /> */}
        <Route path='/crud' element={<Crud />} />
      </Routes>
    </div>
  );
};

export default App;