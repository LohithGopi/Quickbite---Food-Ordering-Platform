import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data.reverse()); // Show latest first
    }

    const cancelOrder = async (orderId) => {
        const response = await axios.post(url + "/api/order/cancel", { orderId }, { headers: { token } });
        if (response.data.success) {
            fetchOrders();
        } else {
            alert(response.data.message);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-10 animate-[fadeIn_0.5s]'>
            <h2 className='text-3xl font-bold mb-8'>My Orders</h2>
            <div className='flex flex-col gap-6'>
                {data.map((order, index) => {
                    return (
                        <div key={index} className='flex flex-wrap lg:grid lg:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-6 text-sm bg-white p-5 rounded-lg border border-gray-200 text-gray-700 shadow-sm transition hover:shadow'>
                            <p className='text-3xl'>📦</p>
                            <p className='font-medium'>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                } else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p className='font-bold ml-1'>₹{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span className='text-primary'>&#x25cf;</span> <b className='font-medium text-[#454545]'>{order.status}</b></p>
                            <div className='flex gap-2'>
                                <button onClick={fetchOrders} className='border-none py-2 px-4 bg-[#ffe1e1] hover:bg-red-200 rounded cursor-pointer text-[#454545] font-medium transition whitespace-nowrap'>Track Order</button>
                                <button 
                                    onClick={() => cancelOrder(order.id)} 
                                    disabled={["Out for delivery", "Delivered", "Cancelled"].includes(order.status)}
                                    className={`border-none py-2 px-4 rounded font-medium transition whitespace-nowrap ${["Out for delivery", "Delivered", "Cancelled"].includes(order.status) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 cursor-pointer text-[#454545]'}`}
                                >
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders;
