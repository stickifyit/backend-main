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
import {  Document } from 'mongoose';
import { io } from '../app';
import { createOrder } from '../controllers/processOrderController';
const router: Router = express.Router();



// get orders 
router.get('/all', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("cart").sort({ createdAt: -1 }).limit(12);
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
})

// confirm order 
router.post('/confirm/:id', async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { state: "confirmed" }, { new: true });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
})
// Process order 
// Create an order

router.post("/create",createOrder)
router.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
})

/// get status of order
router.get("/dashboard", async (req: Request, res: Response) => {
  try {
    // count orders last week
    const orders = (await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      }
    ])).length
    // get price of total orders delevered last week
    const confirmed = await Order.aggregate([
      {
        $match: {
          state: "confirmed",
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      }
    ])
     //  total price from confirmed orders

     const totalPrice = confirmed.reduce((total, order) => {
        return total + order.price;
     },0)


     // total delivered orders
    //  const delivered = (await Order.find({state:"delivered"})).length

     // total delivered orders for last week
    const delivered = (await Order.aggregate([
      {
        $match: {
          state: "delivered",
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      }
    ])).length


    return res.status(200).json({orders,totalPrice,delivered,confirmed:confirmed.length});
  } catch (err) {
    return res.status(500).json({ message: err });
  } 
})

  export default router;