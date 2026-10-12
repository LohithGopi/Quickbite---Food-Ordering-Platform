import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ setCartOpen }) => {
    const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className='flex flex-col h-full bg-white overflow-hidden'>
            <div className='flex items-center justify-between p-6 border-b'>
                <h2 className='text-2xl font-bold text-gray-800'>Your Cart</h2>
                <button onClick={() => setCartOpen(false)} className='text-3xl text-gray-500 hover:text-black'>&times;</button>
            </div>
            
            <div className='flex-1 overflow-y-auto p-6 flex flex-col gap-4'>
                {getTotalCartAmount() === 0 ? (
                    <div className='text-center text-gray-500 mt-10'>Your cart is empty.</div>
                ) : (
                    food_list.map((item, index) => {
                        if (cartItems[item.id] > 0) {
                            return (
                                <div key={index} className='flex items-center justify-between bg-gray-50 p-4 rounded-lg'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-16 h-16 bg-gray-200 rounded overflow-hidden'>
                                            <img src={`${url}/images/${item.image}`} alt="" className='w-full h-full object-cover' onError={(e)=>{e.target.style.display='none'}}/>
                                        </div>
                                        <div>
                                            <p className='font-medium text-gray-800'>{item.name}</p>
                                            <p className='text-primary text-sm'>₹{item.price}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <button onClick={() => removeFromCart(item.id)} className='w-8 h-8 rounded-full bg-red-100 text-red-500 font-bold'>-</button>
                                        <p className='font-medium'>{cartItems[item.id]}</p>
                                        <button onClick={() => addToCart(item.id)} className='w-8 h-8 rounded-full bg-green-100 text-green-500 font-bold'>+</button>
                                    </div>
                                </div>
                            )
                        }
                        return null;
                    })
                )}
            </div>

            {getTotalCartAmount() > 0 && (
                <div className='p-6 bg-gray-50 border-t'>
                    <div className='flex justify-between text-gray-600 mb-2'>
                        <p>Subtotal</p>
                        <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <div className='flex justify-between text-gray-600 mb-2'>
                        <p>Delivery Fee</p>
                        <p>₹{160}</p>
                    </div>
                    <hr className='my-3 border-gray-300' />
                    <div className='flex justify-between text-black font-bold text-lg mb-6'>
                        <b>Total</b>
                        <b>₹{getTotalCartAmount() + 160}</b>
                    </div>
                    <button 
                        onClick={() => {
                            setCartOpen(false);
                            navigate('/placeorder');
                        }} 
                        className='w-full py-4 text-white bg-primary rounded-lg font-bold text-lg hover:bg-orange-600 transition shadow-lg'
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            )}
        </div>
    )
}

export default Cart;
