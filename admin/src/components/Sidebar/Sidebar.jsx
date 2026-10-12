import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r border-[#a9a9a9] pt-[50px] bg-white text-gray-800'>
      <div className='flex flex-col gap-5 pl-[20%]'>
        <NavLink to='/add' className={({isActive}) => `flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-3 rounded-l cursor-pointer ${isActive ? 'bg-[#fff0ed] border-primary' : ''}`}>
          <span className='text-xl'>➕</span>
          <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink to='/list' className={({isActive}) => `flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-3 rounded-l cursor-pointer ${isActive ? 'bg-[#fff0ed] border-primary' : ''}`}>
          <span className='text-xl'>📋</span>
          <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink to='/orders' className={({isActive}) => `flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-3 rounded-l cursor-pointer ${isActive ? 'bg-[#fff0ed] border-primary' : ''}`}>
          <span className='text-xl'>📦</span>
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}
export default Sidebar;
