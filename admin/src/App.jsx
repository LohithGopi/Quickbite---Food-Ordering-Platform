import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000";

  return (
    <div className='font-sans min-h-screen text-[#a9a9a9]'>
      <ToastContainer />
      <Navbar />
      <hr className='bg-[#a9a9a9] h-[1px] border-none' />
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 bg-[#fcfcfc]'>
          <Routes>
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/orders' element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default App;
