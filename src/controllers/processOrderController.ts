import { Response,Request } from "express";
import Order from "../models/orderSchema";
import axios from "axios"
import sharp from "sharp"
import { createCanvas , loadImage , Canvas } from "canvas";
import * as path from "path"
import * as fs from "fs"
import os from "os"




const desktopPath = path.join(os.homedir(), 'Desktop')
const outputFilePath = path.join(desktopPath,'stickify/output.png')



const gridSize = { rows: 3, columns: 3 }; 



export async function processOrderController(req: Request, res: Response) {
    // get order id
    const orderId = req.body.orderId

    try {
        // find order by id
        const order = await Order.findById(orderId)

        // check if order exists
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }


        // fetch the image by url
        const url = "https://storage.googleapis.com/stickify-storage/"+order.sticker?.design

        // download the image
        axios.get(url, { responseType: 'arraybuffer' })
        .then((response) => {
            // Use sharp to resize the image and save it directly
            return sharp(Buffer.from(response.data))
            .resize(500, 500) // Adjust the dimensions as needed
            .toBuffer();
        })
        .then(async(resizedBuffer) => {
            const canvasWidth = 500 * gridSize.columns
            const canvasHeight = 500 * gridSize.rows

            const canvasSharp = sharp({
                create: {
                    width: canvasWidth,
                    height: canvasHeight,
                    channels: 4,
                    background: { r: 255, g: 255, b: 255, alpha: 0},
                },
            }).png()



            // Paste the resized image onto the canvas multiple times
            const Stickers = []
            const cellWidth = canvasWidth / gridSize.columns;
            const cellHeight = canvasHeight / gridSize.rows;
        
            for (let row = 0; row < gridSize.rows; row++) {
                for (let col = 0; col < gridSize.columns; col++) {
                    Stickers.push({
                        input: resizedBuffer,
                        top: row * cellHeight,
                        left: col * cellWidth,
                        blend: 'over' as sharp.Blend // Use sharp.Blend for TypeScript
                    });
                }
              }

              canvasSharp.composite(Stickers)
              return canvasSharp.toBuffer();
          
          
        })
        .then((canvasBuffer) => {
            fs.writeFileSync(outputFilePath, canvasBuffer);
            console.log('Image saved to:', outputFilePath);
        })
        .catch((error) => console.error('Error:', error));







        return res.status(200).json({order})

    } catch (error) {
        return res.status(500).json({ message: error })
    }

}