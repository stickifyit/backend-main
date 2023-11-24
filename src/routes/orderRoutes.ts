import express, { Router, Request, Response } from 'express';
import Order from '../models/orderSchema';
import stickersTypes from '../constants/stickers_types';

import sharp from 'sharp';
import axios from 'axios';
import fs from "fs";
import * as path from "path"
import * as os from 'os';
import { processOrderController } from '../controllers/processOrderController';
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
router.post('/process', processOrderController)
// Create an order
router.post('/create', async (req: Request, res: Response) => {
    try {
      const {
        customerId,
        serviceType,
        quantity,
        sticker,
        label,
        cup,
        t_shirt,
      } = req.body;
  
      // Validate serviceType
      if (!['sticker', 'label', 'cup', 't-shirt'].includes(serviceType)) {
        return res.status(400).json({ message: 'Invalid serviceType' });
      }
  
      // Validate sticker type for 'sticker' serviceType
      if (serviceType === 'sticker' && !stickersTypes.includes(sticker.type)) {
        return res.status(400).json({ message: 'Invalid sticker type' });
      }
  


      // Create an order
      const order = new Order({
        ...req.body
      });
  
      // Save the order to the database
      await order.save();



    if(serviceType === "sticker"){
      // looping the container and make sheets
      for (let i = 0; i < quantity; i++) {

        try {

            const sheet = new Sheet();
            sheet.order = order._id;
            sheet.stickerUrl = sticker.design;
            sheet.size = sticker.size;
            sheet.type = sticker.type;
            const myContainer =await Container.findOne({ isOpen: "open",state:"filling" }).exec();

            if (myContainer !== null) {
                sheet.container = myContainer?._id;
                sheet.snapshot = String(sheet._id);
                // make sheets of container ++ , and add snapshot to sheetsId
                await Container.findByIdAndUpdate(myContainer._id, { $inc: { sheets: 1 } , $push: { sheetsIds: sheet._id } });
                if(myContainer.sheets === 3){
                    await Container.findByIdAndUpdate(myContainer._id, { $set: { state: "ready", isOpen: "closed" } });
                }
            } else {
                const container = new Container();
                container.sheets = 1;
                container.sheetsIds = [sheet._id];
                container.serverTime = new Date();
                sheet.container = container._id;
                sheet.snapshot = String(sheet._id);
                const containerId = container._id;
                setTimeout(async() => {
                  const getC = await Container.findById(containerId);
                  // we get the container to see if it is ready already or not
                  if(getC?.state === "ready"){
                    return;
                  }
                  await Container.findByIdAndUpdate(containerId, { $set: { isOpen: "closed", state: "ready" } });
                  console.log("container closed");
                  io.emit("container closed");
                },1000*60*1)
                await container.save();
            }


            // upload a snapshot of the sheet
            await axios.post("http://localhost:3001/orders/process",{
              orderId:order._id,
              sheetId:sheet._id
            })
            await sheet.save();

        } catch (error) {console.log(error)}
      }

      }

    






  
          res.status(201).json(order);


    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  export default router;