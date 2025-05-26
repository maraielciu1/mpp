// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/home';
// import Collection from './pages/Collection';
// import Crud from './pages/Crud';
// import Navbar from './components/Navbar';
// import SearchBar from './components/SearchBar';
// import { Toaster } from 'react-hot-toast';
// import Product from './pages/Product';
// import Orders from './pages/Orders';
// import FileTransfer from './pages/FileTransfer';

// const App = () => {
//   return (
//     <div className='sm: px-[5vw] md:px-[7vw] lg:px-[9vw]'>
//       <Toaster position="top-center" reverseOrder={false} />
//       <Navbar />
//       <SearchBar />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/collection' element={<Collection />} />
//         <Route path='/product/:productId' element={<Product />} />
//         {/* <Route path='/cart' element={<Cart />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/place-order' element={<PlaceOrder />} />
//         <Route path='/orders' element={<Orders />} /> */}
//         <Route path='/crud' element={<Crud />} />
//         <Route path='/upload' element={<FileTransfer />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Crud from './pages/Crud';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import { Toaster } from 'react-hot-toast';
import Product from './pages/Product';
import Orders from './pages/Orders';
import FileTransfer from './pages/FileTransfer';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Signup from './pages/Signup';

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('activeUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const navigate = useNavigate();

  const handleLogin = ({ user, token }) => {
    setUser(user);
    localStorage.setItem('activeUser', JSON.stringify(user));
    localStorage.setItem('jwtToken', token);
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('activeUser');
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };


  return (
    <div className='sm: px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Toaster position="top-center" reverseOrder={false} />
      {user && <Navbar onLogout={handleLogout} />}
      {user && <SearchBar />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/collection" element={user ? <Collection /> : <Navigate to="/login" />} />
        <Route path="/product/:productId" element={user ? <Product /> : <Navigate to="/login" />} />
        <Route path="/crud" element={user ? <Crud userId={user.id} /> : <Navigate to="/login" />} />
        <Route path="/upload" element={user ? <FileTransfer /> : <Navigate to="/login" />} />
        <Route
          path="/admin"
          element={user?.is_admin ? <AdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
