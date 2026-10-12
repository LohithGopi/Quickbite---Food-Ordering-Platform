import { prisma } from '../server.js';
import Stripe from 'stripe';

// Initialize Stripe safely
if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("⚠️ WARNING: STRIPE_SECRET_KEY is not defined in environment variables!");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ============================
// STRIPE ORDER (ONLINE PAYMENT)
// ============================
export const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        console.log("🔑 Stripe Key Loaded:", !!process.env.STRIPE_SECRET_KEY);

        const { userId, items, amount, address } = req.body;

        // 🔍 Basic validation
        if (!userId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid order data"
            });
        }

        // 🧾 Create order in DB (unpaid)
        const newOrder = await prisma.order.create({
            data: {
                userId,
                items,
                amount,
                address,
                payment: false,
                paymentMethod: "ONLINE"
            }
        });

        // 🛒 Clear cart
        await prisma.user.update({
            where: { id: userId },
            data: { cartData: {} }
        });

        // 🧾 Convert items → Stripe format
        const line_items = items.map((item) => {
            if (!item.name || !item.price || !item.quantity) {
                throw new Error("Invalid item structure");
            }

            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round(item.price * 100), // ₹ → paise
                },
                quantity: item.quantity,
            };
        });

        // 🚚 Delivery charge
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 16000, // ₹160
            },
            quantity: 1,
        });

        // 💳 Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            line_items,

            mode: "payment",

        success_url: `${frontend_url}/success?success=true&orderId=${newOrder.id}`,
        cancel_url: `${frontend_url}/cancel?success=false&orderId=${newOrder.id}`,
    });

    return res.json({
        success: true,
        session_url: session.url,
        sessionId: session.id
    });

    } catch (error) {
        console.error("🔥 STRIPE ERROR:", {
            message: error.message,
            type: error.type,
            code: error.code,
            param: error.param
        });

        // Return a structured error response to the frontend
        return res.status(500).json({
            success: false,
            message: error.message || "Stripe session creation failed",
            error_details: {
                type: error.type,
                code: error.code,
                param: error.param
            }
        });
    }
};


// ============================
// CASH ON DELIVERY
// ============================
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        if (!userId || !items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid order data"
            });
        }

        const newOrder = await prisma.order.create({
            data: {
                userId,
                items,
                amount,
                address,
                paymentMethod: "COD",
                payment: false
            }
        });

        await prisma.user.update({
            where: { id: userId },
            data: { cartData: {} }
        });

        return res.json({
            success: true,
            message: "Order placed successfully (COD)",
            orderId: newOrder.id
        });

    } catch (error) {
        console.error("❌ COD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================
// VERIFY PAYMENT
// ============================
export const verifyOrder = async (req, res) => {
    try {
        const { orderId, success } = req.body;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Missing orderId"
            });
        }

        if (success === "true") {
            await prisma.order.update({
                where: { id: parseInt(orderId) },
                data: { payment: true }
            });

            return res.json({ success: true, message: "Payment successful" });

        } else {
            await prisma.order.delete({
                where: { id: parseInt(orderId) }
            });

            return res.json({ success: false, message: "Payment failed" });
        }

    } catch (error) {
        console.error("❌ VERIFY ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================
// USER ORDERS
// ============================
export const userOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: req.body.userId }
        });

        return res.json({ success: true, data: orders });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


// ============================
// ALL ORDERS (ADMIN)
// ============================
export const listOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany();

        return res.json({ success: true, data: orders });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


// ============================
// UPDATE ORDER STATUS
// ============================
export const updateStatus = async (req, res) => {
    try {
        await prisma.order.update({
            where: { id: parseInt(req.body.orderId) },
            data: { status: req.body.status }
        });

        return res.json({ success: true, message: "Status Updated" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


// ============================
// DELETE ORDER
// ============================
export const removeOrder = async (req, res) => {
    try {
        await prisma.order.delete({
            where: { id: parseInt(req.body.orderId) }
        });

        return res.json({ success: true, message: "Order Removed" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ============================
// CANCEL ORDER
// ============================
export const cancelOrder = async (req, res) => {
    try {
        const { orderId, userId } = req.body;

        const order = await prisma.order.findUnique({
            where: { id: parseInt(orderId) }
        });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.userId !== userId) {
            return res.status(401).json({ success: false, message: "Unauthorized user" });
        }

        // Allow cancellation only if not out for delivery or delivered
        const restrictedStatuses = ["Out for delivery", "Delivered", "Cancelled"];
        if (restrictedStatuses.includes(order.status)) {
            return res.status(400).json({ success: false, message: `Cannot cancel order in '${order.status}' state` });
        }

        await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { status: "Cancelled" }
        });

        return res.json({ success: true, message: "Order cancelled" });

    } catch (error) {
        console.error("❌ CANCEL ERROR:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};