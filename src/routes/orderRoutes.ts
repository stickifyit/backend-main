import express, { Router, Request, Response } from 'express';
import Order from '../models/orderSchema';
import stickersTypes from '../constants/stickers_types';


const router: Router = express.Router();


// Create an order
router.post('/create', async (req: Request, res: Response) => {
    try {
      const {
        customerName,
        serviceType,
        quantity,
        sticker,
        label,
        cup,
        t_shirt,
      } = req.body;
  
      // Validate serviceType
      if (!['sticker', 'label', 'cup', 't_shirt'].includes(serviceType)) {
        return res.status(400).json({ message: 'Invalid serviceType' });
      }
  
      // Validate sticker type for 'sticker' serviceType
      if (serviceType === 'sticker' && !stickersTypes.includes(sticker.type)) {
        return res.status(400).json({ message: 'Invalid sticker type' });
      }
  
      // Create an order
      const order = new Order({
        customerName,
        serviceType,
        quantity,
        sticker,
        label,
        cup,
        t_shirt,
      });
  
      // Save the order to the database
      await order.save();
  
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  export default router;