import express, { Express, Request, Response } from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import orderRoutes from './routes/orderRoutes';

const app: Express = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

// Error handling middleware
app.use(errorMiddleware);
// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express Server!');
});

export default app;
