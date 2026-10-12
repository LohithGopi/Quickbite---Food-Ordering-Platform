import { prisma } from '../server.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) return res.json({ success: false, message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword, cartData: {} }
        });
        const token = createToken(newUser.id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.json({ success: false, message: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

        const token = createToken(user.id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
