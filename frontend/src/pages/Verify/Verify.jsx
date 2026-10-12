import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='min-h-[60vh] grid'>
            <div className='w-24 h-24 place-self-center border-[5px] border-[#bdbdbd] border-t-primary rounded-full animate-spin'></div>
        </div>
    )
}

export default Verify;
