import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRouter from './routes/userRoute.js';
import foodRouter from './routes/foodRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

export const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
