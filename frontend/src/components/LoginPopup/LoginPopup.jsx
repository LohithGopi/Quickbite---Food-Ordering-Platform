import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({ name: "", email: "", password: "" });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url + (currState === "Login" ? "/api/user/login" : "/api/user/register");

        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    }

    return (
        <div className='fixed inset-0 z-[100] bg-[#00000090] grid'>
            <form onSubmit={onLogin} className='place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 py-6 px-8 rounded-lg text-sm animate-[fadeIn_0.5s]'>
                <div className='flex justify-between items-center text-black'>
                    <h2 className='text-2xl font-bold'>{currState}</h2>
                    <span onClick={() => setShowLogin(false)} className='cursor-pointer text-xl font-bold'>&times;</span>
                </div>
                <div className='flex flex-col gap-5'>
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required className='border border-gray-300 p-2 rounded outline-primary' />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required className='border border-gray-300 p-2 rounded outline-primary' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required className='border border-gray-300 p-2 rounded outline-primary' />
                </div>
                <button type='submit' className='border-none p-2 rounded text-white bg-primary text-base cursor-pointer'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className='flex items-start gap-2 mt-[-15px]'>
                    <input type="checkbox" required className='mt-[5px]' />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")} className='text-primary font-medium cursor-pointer'>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")} className='text-primary font-medium cursor-pointer'>Login here</span></p>
                }
            </form>
        </div>
    )
}
export default LoginPopup;
