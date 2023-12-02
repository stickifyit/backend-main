import express, { Router, Request, Response } from 'express';
import Order from '../models/orderSchema';
import stickersTypes from '../constants/stickers_types';

import sharp from 'sharp';
import axios from 'axios';
import fs from "fs";
import * as path from "path"
import * as os from 'os';
import Sheet from '../models/sheetSchema';
import Container from '../models/containerSchema';
import { Document } from 'mongoose';
import { io } from '../app';
const router: Router = express.Router();



// get orders 
router.get('/all', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(12);
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
})

// Process order 
// Create an order
router.post("/create", )


  export default router;