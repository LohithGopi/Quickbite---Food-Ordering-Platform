import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function testStripe() {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: { name: "Test Item" },
                        unit_amount: 10000 // 100 INR
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/verify?success=true&orderId=1`,
            cancel_url: `http://localhost:5173/verify?success=false&orderId=1`
        });
        console.log("SUCCESS:", session.url);
    } catch (e) {
        console.error("STRIPE_ERROR:");
        console.error(e.message);
    }
}
testStripe();
