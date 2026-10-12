import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Cancel = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);

    useEffect(() => {
        const cleanupFailedOrder = async () => {
            if (orderId) {
                try {
                    await axios.post(url + "/api/order/verify", { success: "false", orderId });
                } catch (error) {
                    console.error("Cleanup failed:", error);
                }
            }
        };
        cleanupFailedOrder();
    }, [orderId, url]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fadeIn">
            <div className="bg-red-100 p-8 rounded-full mb-6">
                <span className="text-6xl">❌</span>
            </div>
            <h1 className="text-4xl font-bold text-[#303030] mb-4">Payment Cancelled</h1>
            <p className="text-gray-600 mb-8 text-lg">Your payment was not completed. You can try again or return to the menu.</p>
            <div className="flex gap-4">
                <button 
                    onClick={() => navigate('/placeorder')} 
                    className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors shadow-md"
                >
                    Retry Payment
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

export default Cancel;
