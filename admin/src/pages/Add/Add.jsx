import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({ name: "", description: "", price: "", category: "Salad" });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({ name: "", description: "", price: "", category: "Salad" });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className='w-[70%] ml-[max(5vw,25px)] mt-12 text-[#6d6d6d] text-base'>
            <form className='flex flex-col gap-5' onSubmit={onSubmitHandler}>
                <div className='flex flex-col gap-2'>
                    <p className='text-black font-semibold'>Upload Image</p>
                    <label htmlFor="image">
                        <div className={`w-[120px] h-[120px] rounded border-2 border-dashed flex flex-col items-center justify-center cursor-pointer ${image ? 'bg-gray-100 border-gray-400' : 'bg-gray-50 border-gray-300'}`}>
                            {image ? <span className='text-4xl text-green-500'>✔</span> : <span className='text-3xl text-gray-400'>🖼️</span>}
                        </div>
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className='flex flex-col gap-2 w-[max(40%,250px)]'>
                    <p className='text-black font-semibold'>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' required className='p-2 border border-gray-400 rounded outline-primary text-black'/>
                </div>
                <div className='flex flex-col gap-2 w-[max(40%,250px)]'>
                    <p className='text-black font-semibold'>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required className='p-2 border border-gray-400 rounded outline-primary text-black'></textarea>
                </div>
                <div className='flex gap-8'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-black font-semibold'>Product category</p>
                        <select onChange={onChangeHandler} name="category" className='p-2 border border-gray-400 rounded max-w-[120px] outline-primary text-black bg-white'>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-black font-semibold'>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='₹20' required className='p-2 border border-gray-400 rounded max-w-[120px] outline-primary text-black'/>
                    </div>
                </div>
                <button type='submit' className='max-w-[120px] border-none p-3 bg-black text-white cursor-pointer hover:bg-gray-800 rounded font-semibold'>ADD</button>
            </form>
        </div>
    )
}
export default Add;
