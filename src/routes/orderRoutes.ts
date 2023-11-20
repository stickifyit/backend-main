import express, { Router, Request, Response } from 'express';
import Order from '../models/orderSchema';
import stickersTypes from '../constants/stickers_types';

import sharp from 'sharp';
import axios from 'axios';
import fs from "fs";
import * as path from "path"
import * as os from 'os';
const router: Router = express.Router();


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
      if (!['sticker', 'label', 'cup', 't_shirt'].includes(serviceType)) {
        return res.status(400).json({ message: 'Invalid serviceType' });
      }
  
      // Validate sticker type for 'sticker' serviceType
      if (serviceType === 'sticker' && !stickersTypes.includes(sticker.type)) {
        return res.status(400).json({ message: 'Invalid sticker type' });
      }
  
      // Create an order
      const order = new Order({
        customerId,
        serviceType,
        quantity,
        sticker,
        label,
        cup,
        t_shirt,
      });
  
      // Save the order to the database
      await order.save();



      // lets create a sheet based on this order  

      try {
        // Get the image URL from the request body
        const  imageUrl  = sticker.design;




        // Fetch the image from the URL
        const response = await axios.get(`https://storage.googleapis.com/stickify-storage/${imageUrl}`, { responseType: 'arraybuffer' });
    
        // Process the image using sharp
        const processedImageBuffer = await sharp(response.data)
          // Your image processing operations here (e.g., resize, rotate, etc.)
          .resize({ width: 3000, height: 3000 })
          .png()
          .toBuffer();
    
        // Save the processed image to the /uploads folder
        const desktopPath = path.join(os.homedir(), 'Desktop','uploads');
        const imagePath = path.join(desktopPath, 'processedImage.png');

        if (!fs.existsSync(desktopPath)) {
          fs.mkdirSync(desktopPath);
        }

        fs.writeFileSync(imagePath, processedImageBuffer);

        console.log("image created")
        
      } catch (err){
        console.log(err)
      }



















  
      res.status(201).json(order);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  export default router;