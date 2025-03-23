import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Collection from './pages/collection';
import Crud from './pages/crud';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <div className='px-4 sm: px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/crud' element={<Crud />} />
      </Routes>
    </div>
  );
};

export default App;