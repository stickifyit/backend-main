import { Response,Request } from "express";
import Order from "../models/orderSchema";
import axios from "axios"
import sharp from "sharp"
import { createCanvas , loadImage , Canvas } from "canvas";
import * as path from "path"
import * as fs from "fs"
import os from "os"





// pixels for each cm
const cm = 100;

// spacing between stickers
const spacing = 0.2 * cm;

// size of sticker by cm (including spacing)
const sizeX = 8;
const sizeY = 8;

// sheet dimensions
const canvasWidth = 20 * cm;
const canvasHeight = 40 * cm;

export async function processOrderController(req: Request, res: Response) {
  // get order id
  const orderId = req.body.orderId;

  try {
    // find order by id
    const order = await Order.findById(orderId);

    // check if order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // fetch the image by url
    const url = "https://storage.googleapis.com/stickify-storage/" + order.sticker?.design;

    // download the image
    axios.get(url, { responseType: 'arraybuffer' })
      .then((response) => {
        // Use sharp to resize the image and save it directly
        return sharp(Buffer.from(response.data))
          .resize(sizeX * cm - (spacing * 2), sizeY * cm - (spacing * 2)) // Adjust the dimensions as needed
          .toBuffer();
      })
      .then(async (resizedBuffer) => {

        const canvasSharp = sharp({
          create: {
            width: canvasWidth,
            height: canvasHeight,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 0.3 },
          },
        }).png();

        // Paste the resized image onto the canvas multiple times
        const stickers = [];
        const gridSize = {
          columns: Math.floor(canvasWidth / (sizeX * cm)),
          rows: Math.floor(canvasHeight / (sizeY * cm)),
        };
        // long of each step 
        const cellWidth = Math.ceil(sizeX * cm);
        const cellHeight = Math.ceil(sizeY * cm);
        
        // calculate the margin

        const marginX = Math.ceil((canvasWidth - (gridSize.columns * cellWidth)) / 2) ;
        const marginY = Math.ceil((canvasHeight - (gridSize.rows * cellHeight)) / 2) ;

        console.log(gridSize)
        for (let row = 0; row < gridSize.rows; row++) {
          for (let col = 0; col < gridSize.columns; col++) {
            stickers.push({
              input: resizedBuffer,
              top: row * cellHeight+spacing+marginY,
              left: col * cellWidth+spacing+marginX,
              blend: 'over' as sharp.Blend // Use sharp.Blend for TypeScript
            });
          }
        }

        canvasSharp.composite(stickers);
        return canvasSharp.toBuffer();
      })
      .then((canvasBuffer) => {
        // this one is just for naming the image with the size of it
        const gridSize = {
          columns: Math.floor(canvasWidth / (sizeX * cm)),
          rows: Math.floor(canvasHeight / (sizeY * cm)),
        };

        const desktopPath = path.join(os.homedir(), 'Desktop')
        const outputFilePath = path.join(desktopPath,`stickify/${sizeX}x${sizeY} - (${gridSize.rows*gridSize.columns} sticker).png`)

        fs.writeFileSync(outputFilePath, canvasBuffer);
        console.log('Image saved to:', outputFilePath);
      })
      .catch((error) => console.error('Error:', error));

    return res.status(200).json({ order });

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}