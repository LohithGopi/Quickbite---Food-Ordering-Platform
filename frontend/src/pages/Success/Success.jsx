import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
    const { setCartItems, url } = useContext(StoreContext);
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAndClear = async () => {
            try {
                // 1. Verify payment on backend
                await axios.post(url + "/api/order/verify", { success: "true", orderId });
                
                // 2. Clear the cart on the frontend
                setCartItems({});
            } catch (error) {
                console.error("Verification failed:", error);
            }
        };

        if (orderId) {
            verifyAndClear();
        }
    }, [orderId, setCartItems, url]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fadeIn">
            <div className="bg-green-100 p-8 rounded-full mb-6">
                <span className="text-6xl">🎉</span>
            </div>
            <h1 className="text-4xl font-bold text-[#303030] mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8 text-lg">Your delicious meal is being prepared and will be with you shortly.</p>
            <div className="flex gap-4">
                <button 
                    onClick={() => navigate('/myorders')} 
                    className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors shadow-md"
                >
                    Track My Orders
                </button>
                <button 
                    onClick={() => navigate('/')} 
                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Success;
