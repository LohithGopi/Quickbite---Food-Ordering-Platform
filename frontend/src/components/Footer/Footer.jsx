import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-800 text-gray-200 py-10 px-4 md:px-20 mt-20' id='footer'>
      <div className='flex flex-col md:flex-row justify-between gap-10'>
        <div className='flex-1'>
          <h2 className='text-3xl font-bold text-primary mb-4'>QuickBite.</h2>
          <p className='text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc.</p>
        </div>
        <div className='flex-1'>
          <h2 className='text-xl font-bold mb-4 text-white'>COMPANY</h2>
          <ul className='flex flex-col gap-2'>
            <li className='cursor-pointer hover:text-primary'>Home</li>
            <li className='cursor-pointer hover:text-primary'>About Us</li>
            <li className='cursor-pointer hover:text-primary'>Delivery</li>
            <li className='cursor-pointer hover:text-primary'>Privacy Policy</li>
          </ul>
        </div>
        <div className='flex-1'>
          <h2 className='text-xl font-bold mb-4 text-white'>GET IN TOUCH</h2>
          <ul className='flex flex-col gap-2'>
            <li>+1-234-567-8901</li>
            <li>contact@quickbite.com</li>
          </ul>
        </div>
      </div>
      <hr className='my-6 border-gray-600' />
      <p className='text-center text-sm'>Copyright 2026 © QuickBite - All Right Reserved.</p>
    </div>
  )
}
export default Footer;
