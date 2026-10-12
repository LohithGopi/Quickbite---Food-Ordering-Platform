import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

import { Home, Cart, PlaceOrder, MyOrders, Verify, Success, Cancel } from './pages';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="font-sans min-h-screen flex flex-col">
        <Navbar setShowLogin={setShowLogin} setCartOpen={setCartOpen} />
        
        {/* Slide-in Cart Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <Cart setCartOpen={setCartOpen} />
        </div>
        {cartOpen && <div onClick={()=>setCartOpen(false)} className="fixed inset-0 bg-black/50 z-40"></div>}

        <div className="w-[80%] m-auto mt-5 flex-1 w-full max-w-[1200px]">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/myorders' element={<MyOrders />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/success' element={<Success />} />
            <Route path='/cancel' element={<Cancel />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App;
