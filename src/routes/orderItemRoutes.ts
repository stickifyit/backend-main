import express, { Request, Response } from 'express';
import OrderItem from '../models/orderItemSchema';
import Container from '../models/containerSchema';

const router = express.Router()


// Create a new order item
router.post('/create', async (req: Request, res: Response) => {
  try {
    if (req.body.type == "sticker-sheet" || req.body.type == "custom-sheet") {

            // this code bellow make the sheet in the container 

            // const currentContainer = await Container.findOne({ state: "filling" });
            // // if the is a container that is not ready
            // if (currentContainer) {
            //       const orderItem = new OrderItem(req.body);
            //       if (req.body.type == "sticker-sheet" && orderItem.stickerSheetSchema) {
            //         orderItem.stickerSheetSchema.container = currentContainer._id;
            //       } else if (req.body.type == "custom-sheet" && orderItem.customSheetSchema) {
            //         orderItem.customSheetSchema.container = currentContainer._id;
            //       }
            //       await Container.findByIdAndUpdate(currentContainer._id, {$inc: { sheets: 1 }, $push: { sheetsIds: orderItem._id } });
            //       if(currentContainer.sheetsIds.length == 3){
            //         await Container.findByIdAndUpdate(currentContainer._id, {state: "ready"});
            //       }
            //       // i want to push the id of the sheet to the container
            //       await orderItem.save();
            //       res.status(201).json(orderItem);
            //   // if there is no container that is not ready
            // }else{
            //       const newContainer = new Container();
            //       const orderItem = new OrderItem(req.body);
            //       if (req.body.type == "sticker-sheet" && orderItem.stickerSheetSchema) {
            //         orderItem.stickerSheetSchema.container = newContainer._id;
            //       } else if (req.body.type == "custom-sheet" && orderItem.customSheetSchema) {
            //         orderItem.customSheetSchema.container = newContainer._id;
            //       }
            //       // Container.findByIdAndUpdate(newContainer._id, {$inc: { sheets: 1 }, $push: { sheetsIds: orderItem._id } });
            //       newContainer.sheets = 1;
            //       newContainer.sheetsIds = [orderItem._id];
            //       await newContainer.save();
            //       await orderItem.save();
            //       res.status(201).json(orderItem);
            // }

              const orderItem = new OrderItem(req.body);
              await orderItem.save();
              res.status(201).json(orderItem);


    }else{
              const orderItem = new OrderItem(req.body);
              await orderItem.save();
              res.status(201).json(orderItem);
    }
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