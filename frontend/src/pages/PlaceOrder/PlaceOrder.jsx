import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "", lastName: "", email: "", street: "",
        city: "", state: "", zipCode: "", country: "", phone: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("stripe");
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item.id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item.id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 160,
        };

        if (paymentMethod === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const stripe = await stripePromise;
                const { sessionId } = response.data;
                const { error } = await stripe.redirectToCheckout({ sessionId });
                if (error) {
                    console.error("Stripe Redirect Error:", error);
                    alert("Stripe redirect failed.");
                }
            } else {
                alert(`Error: ${response.data.message || "Stripe session creation failed."}`);
            }
        } else {
            // Cash on Delivery
            let response = await axios.post(url + "/api/order/cod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                alert("Error: Failed to place COD order.");
            }
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/'); // Instead of cart, since cart is a sidebar, user just gets pushed to home
        } else if (getTotalCartAmount() === 0) {
            navigate('/');
        }
    }, [token]);

    return (
        <form onSubmit={placeOrder} className='flex flex-col lg:flex-row justify-between gap-12 mt-10 animate-[fadeIn_0.5s]'>
            <div className='w-full max-w-[500px]'>
                <p className='text-3xl font-semibold mb-8 text-[#303030]'>Delivery Information</p>
                <div className='flex gap-4 mb-4'>
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' className='w-full p-2 border border-gray-300 rounded outline-primary'/>
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' className='w-full p-2 border border-gray-300 rounded outline-primary'/>
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' className='w-full p-2 mb-4 border border-gray-300 rounded outline-primary'/>
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' className='w-full p-2 mb-4 border border-gray-300 rounded outline-primary'/>
                <div className='flex gap-4 mb-4'>
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' className='w-full p-2 border border-gray-300 rounded outline-primary'/>
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' className='w-full p-2 border border-gray-300 rounded outline-primary'/>
                </div>
                <div className='flex gap-4 mb-4'>
                    <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip code' className='w-full p-2 border border-gray-300 rounded outline-primary'/>
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' className='w-full p-2 border border-gray-300 rounded outline-primary'/>
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' className='w-full p-2 border border-gray-300 rounded outline-primary'/>
            </div>
            <div className='w-full max-w-[500px]'>
                <div className='flex flex-col gap-5'>
                    <h2 className='text-3xl font-semibold text-[#303030]'>Cart Totals</h2>
                    <div className='flex justify-between text-gray-600 border-b pb-2'>
                        <p>Subtotal</p>
                        <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <div className='flex justify-between text-gray-600 border-b pb-2'>
                        <p>Delivery Fee</p>
                        <p>₹{getTotalCartAmount() === 0 ? 0 : 160}</p>
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold mb-2'>Payment Method</p>
                        <div className='flex flex-col gap-2'>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input type="radio" name="payment" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} />
                                <span>Stripe (Credit/Debit Card)</span>
                            </label>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                                <span>Cash on Delivery</span>
                            </label>
                        </div>
                    </div>
                    <button type='submit' className='border-none text-white bg-primary w-full py-3 rounded text-lg mt-5 cursor-pointer hover:bg-orange-600 shadow'>
                        {paymentMethod === "stripe" ? "PROCEED TO PAYMENT" : "PLACE ORDER"}
                    </button>
                </div>
            </div>
        </form>
    )
}
export default PlaceOrder;
