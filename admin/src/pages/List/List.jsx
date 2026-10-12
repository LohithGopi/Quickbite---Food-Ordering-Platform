import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error");
        }
    }

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='w-[70%] ml-[max(5vw,25px)] mt-12 text-[#6d6d6d] text-base'>
            <p className='text-black font-semibold text-lg mb-5'>All Foods List</p>
            <div>
                <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2 py-3 px-4 border border-[#cacaca] bg-[#f9f9f9] text-sm text-black'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2 py-3 px-4 border border-[#cacaca] text-sm mt-[-1px] transition-colors hover:bg-gray-50'>
                            <img src={`${url}/images/` + item.image} alt="" className='w-12 h-12 object-cover rounded' onError={(e)=>{e.target.style.display='none'}}/>
                            <p className='text-gray-800'>{item.name}</p>
                            <p>{item.category}</p>
                            <p className='font-bold text-gray-800'>₹{item.price}</p>
                            <p onClick={() => removeFood(item.id)} className='cursor-pointer w-8 h-8 rounded bg-red-100 flex items-center justify-center font-bold text-red-500 hover:bg-red-200 transition-colors'>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default List;
