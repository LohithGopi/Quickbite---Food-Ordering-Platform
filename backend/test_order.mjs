import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const prisma = new PrismaClient();

async function testOrder() {
    try {
        let user = await prisma.user.findFirst();
        if (!user) {
            user = await prisma.user.create({
                data: { name: "Test", email: "test@test.com", password: "123" }
            });
        }
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        const orderData = {
            address: {
                firstName: "A", lastName: "B", email: "a@b.com", street: "123",
                city: "C", state: "S", zipCode: "12345", country: "US", phone: "123"
            },
            items: [
                {
                    id: 1,
                    name: "Greek Salad",
                    price: 364,
                    quantity: 1
                }
            ],
            amount: 524,
            userId: ""
        };

        const response = await fetch("http://localhost:4000/api/order/place", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();
        console.log("RESPONSE:", data);
    } catch (e) {
        console.error("FETCH ERROR:");
        console.error(e.message);
    } finally {
        await prisma.$disconnect();
    }
}
testOrder();
