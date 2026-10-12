import { prisma } from '../server.js';

export const addToCart = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.body.userId } });
        let cartData = user.cartData || {};
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await prisma.user.update({
            where: { id: req.body.userId },
            data: { cartData }
        });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.body.userId } });
        let cartData = user.cartData || {};
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await prisma.user.update({
            where: { id: req.body.userId },
            data: { cartData }
        });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export const getCart = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.body.userId } });
        res.json({ success: true, cartData: user.cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
