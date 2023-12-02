import express, { Request, Response, Router } from "express";
import CustomSheet from "../models/customSheetSchema";



const router:Router = express.Router();


router.post("/create", async (req: Request, res: Response) => {
    try{
        const { orderId, items } = req.body;
        const newCustomSheet = new CustomSheet({ orderId, items });
        const savedCustomSheet = await newCustomSheet.save();
        res.status(201).json(savedCustomSheet);
    }catch(err){
        res.status(500).json({message: err});
        console.log(err)
    }
})


export default router