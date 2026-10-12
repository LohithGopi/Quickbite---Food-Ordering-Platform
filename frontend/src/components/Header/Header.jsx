import React from 'react'
const Header = () => {
  return (
    <div className='h-[34vw] my-8 mx-auto relative rounded-2xl bg-primary flex items-end'>
      <div className='absolute bg-gradient-to-tr from-orange-400 to-red-500 w-full h-full rounded-2xl shadow-xl opacity-90'></div>
      <div className='absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] p-[4vw] text-white'>
        <h2 className='font-bold text-[max(4.5vw,22px)] leading-tight'>Order your favourite food here</h2>
        <p className='hidden md:block text-sm lg:text-base'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <button className='border-none text-[#747474] font-medium bg-white py-[1vw] px-[2vw] rounded-full hover:bg-gray-100 transition shadow'>View Menu</button>
      </div>
    </div>
  )
}
export default Header;
