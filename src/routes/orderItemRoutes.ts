import express, { Request, Response } from 'express';
import OrderItem from '../models/orderItemSchema';

const router = express.Router()


// Create a new order item
router.post('/create', async (req: Request, res: Response) => {
  try {
    const orderItem = new OrderItem(req.body);
    await orderItem.save();
    res.status(201).json(orderItem);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
});

// Update an order item by ID
router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const orderItem = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json(orderItem);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Delete an order item by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json(orderItem);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Get an order item by ID
router.get('/get/:id', async (req: Request, res: Response) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json(orderItem);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Get all order items
router.get('/getall', async (_: Request, res: Response) => {
  try {
    const orderItems = await OrderItem.find();
    res.json(orderItems);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});


export default router