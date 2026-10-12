import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data.reverse());
        } else {
            toast.error("Error");
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        });
        if (response.data.success) {
            await fetchAllOrders();
        }
    }

    const removeOrder = async (orderId) => {
        const response = await axios.post(url + "/api/order/remove", { orderId });
        if (response.data.success) {
            toast.success(response.data.message);
            await fetchAllOrders();
        } else {
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='w-full ml-0 md:ml-[5vw] mt-12 text-[#6d6d6d] text-base pr-4 md:pr-10'>
            <h3 className='text-black font-semibold text-lg mb-5'>Order Page</h3>
            <div className='flex flex-col gap-6'>
                {orders.map((order, index) => (
                    <div key={index} className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-6 border border-primary p-5 rounded-lg bg-white text-sm text-[#505050] shadow-sm'>
                        <span className='text-4xl text-primary md:mx-auto'>📦</span>
                        <div>
                            <p className='font-semibold text-black mb-2'>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    } else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p className='font-semibold text-black mt-4 mb-1'>{order.address.firstName + " " + order.address.lastName}</p>
                            <div className='mb-2'>
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                            </div>
                            <p>{order.address.phone}</p>
                        </div>
                        <p className='text-black font-medium mt-2 md:mt-0'>Items: {order.items.length}</p>
                        <p className='font-bold text-black border-l pl-4 md:border-none md:pl-0 mt-2 md:mt-0'>₹{order.amount}</p>
                        <div className='flex flex-col gap-3 w-full md:w-auto'>
                            <select onChange={(event) => statusHandler(event, order.id)} value={order.status} className='bg-[#ffe8e4] border border-primary text-black p-2 outline-none rounded font-medium mt-2 md:mt-0 w-full'>
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            <button onClick={() => removeOrder(order.id)} className='bg-red-100 text-red-500 border border-red-500 font-medium py-2 px-4 rounded hover:bg-red-200 transition w-full'>Remove Order</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Orders;
