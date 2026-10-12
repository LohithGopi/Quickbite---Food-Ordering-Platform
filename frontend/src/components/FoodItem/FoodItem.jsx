import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className='w-full m-auto rounded-2xl shadow-[0px_0px_10px_#00000015] transition duration-300 animate-[fadeIn_1s] hover:scale-105 bg-white'>
      <div className='relative'>
        <div className='w-full h-48 bg-gray-200 rounded-t-2xl flex items-center justify-center text-gray-400 overflow-hidden'>
             <img src={`${url}/images/${image}`} alt={name} className='w-full h-full object-cover' onError={(e)=>{e.target.style.display='none'}}/>
        </div>
        {!cartItems[id]
          ? <div className='absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer shadow border hover:bg-gray-50' onClick={() => addToCart(id)}>
              <span className='font-bold text-2xl text-green-500'>+</span>
            </div>
          : <div className='absolute bottom-4 right-4 flex items-center gap-2 p-1 rounded-full bg-white shadow border'>
              <div onClick={() => removeFromCart(id)} className='w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500 cursor-pointer font-bold select-none'>-</div>
              <p className='w-4 text-center font-medium'>{cartItems[id]}</p>
              <div onClick={() => addToCart(id)} className='w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-500 cursor-pointer font-bold select-none'>+</div>
            </div>
        }
      </div>
      <div className='p-5'>
        <div className='flex justify-between items-center mb-2'>
          <p className='text-lg font-medium text-gray-800'>{name}</p>
        </div>
        <p className='text-[#676767] text-sm mb-4 line-clamp-2 h-10'>{description}</p>
        <p className='text-primary text-xl font-bold'>₹{price}</p>
      </div>
    </div>
  )
}
export default FoodItem;
