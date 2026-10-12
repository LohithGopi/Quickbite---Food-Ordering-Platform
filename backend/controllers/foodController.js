import { prisma } from '../server.js';
import fs from 'fs';

export const addFood = async (req, res) => {
    const image_filename = `${req.file.filename}`;
    try {
        const food = await prisma.food.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                category: req.body.category,
                image: image_filename
            }
        });
        res.json({ success: true, message: "Food Added", food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export const listFood = async (req, res) => {
    try {
        const foods = await prisma.food.findMany();
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export const removeFood = async (req, res) => {
    try {
        const food = await prisma.food.findUnique({ where: { id: parseInt(req.body.id) } });
        if (food) {
            fs.unlink(`uploads/${food.image}`, () => {});
            await prisma.food.delete({ where: { id: parseInt(req.body.id) } });
        }
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
