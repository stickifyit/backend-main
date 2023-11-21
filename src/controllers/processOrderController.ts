import { Response,Request } from "express";
import Order from "../models/orderSchema";
import axios from "axios"
import sharp from "sharp"
import { createCanvas , loadImage , Canvas } from "canvas";
import * as path from "path"
import * as fs from "fs"






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
        .then(response => {
            // resize the image
            return sharp(Buffer.from(response.data))
                   .resize({ width: 500, height: 500 })
                   .toBuffer()
        })
        .then(resizedBuffer => {
            // load the image
            return loadImage(resizedBuffer)
        })
        .then(image => {
            // create a canvas
            const canvas:Canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');


            // draw the image
            ctx.drawImage(image, 0, 0, image.width, image.height);
            
            // playing for test
            ctx.fillStyle = 'red'
            ctx.fillRect(50, 50, 100, 100)

            // save the final image 

            const desktopPath = path.join(require('os').homedir(), 'Desktop')
            const outputFilePath = path.join(desktopPath,'output.png')
            const out = fs.createWriteStream(outputFilePath);
            const stream = canvas.createPNGStream();
            stream.pipe(out)
            out.on('finish', () => {
                console.log('The PNG file was created!');
            })
            
            //
        })
        .catch(error => {
            console.error(error);
        })








        return res.status(200).json({order})

    } catch (error) {
        return res.status(500).json({ message: error })
    }

}