import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-4 px-10 bg-white'>
      <h2 className='text-3xl font-bold text-primary'>QuickBite. <span className='text-xs font-normal text-gray-500'>Admin Panel</span></h2>
      <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl'>👤</div>
    </div>
  )
}
export default Navbar;
