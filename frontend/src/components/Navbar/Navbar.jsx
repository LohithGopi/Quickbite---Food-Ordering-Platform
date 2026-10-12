import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, setCartOpen }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className='flex justify-between items-center px-4 py-4 md:px-10 bg-white shadow-sm sticky top-0 z-40'>
      <Link to='/' className='text-3xl font-bold text-primary'>QuickBite.</Link>
      <ul className='hidden md:flex gap-6 text-gray-600 font-medium cursor-pointer'>
        <Link to='/' onClick={() => setMenu("home")} className={menu==="home"?"text-primary border-b-2 border-primary":""}>Home</Link>
        <a href='#menu' onClick={() => setMenu("menu")} className={menu==="menu"?"text-primary border-b-2 border-primary":""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu==="mobile-app"?"text-primary border-b-2 border-primary":""}>Mobile App</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu==="contact-us"?"text-primary border-b-2 border-primary":""}>Contact Us</a>
      </ul>
      <div className='flex items-center gap-6'>
        <div className='relative cursor-pointer' onClick={() => setCartOpen(true)}>
          <span className='text-3xl font-bold'>🛒</span>
          {getTotalCartAmount() > 0 && <div className='absolute -top-2 -right-2 bg-primary w-3 h-3 rounded-full'></div>}
        </div>
        {!token ? <button onClick={() => setShowLogin(true)} className='bg-transparent border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition'>Sign in</button>
        : <div className='relative group cursor-pointer'>
            <div className='bg-gray-100 rounded-full p-2'>👤</div>
            <ul className='absolute right-0 hidden group-hover:flex flex-col gap-2 bg-white border border-gray-200 py-3 px-5 rounded-md shadow-lg z-50 w-32'>
              <li onClick={() => navigate('/myorders')} className='flex items-center gap-2 hover:text-primary'><p>Orders</p></li>
              <hr/>
              <li onClick={logout} className='flex items-center gap-2 hover:text-primary'><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar;
