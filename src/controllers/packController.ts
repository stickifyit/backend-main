import {  Request, Response } from 'express';
import  PackModel  from '../models/packSchema';

// get all the packs
export const getPacks = async (req: Request, res: Response) => {
    try {
        const packs = await PackModel.find();
        res.json(packs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




// create a pack 
export const createPack = async (req: Request, res: Response) => {
    try {
        const { name,description, imageURL, keywords, category } = req.body;
        const newPack = new PackModel({ name, imageURL, keywords, category,description });
        const savedPack = await newPack.save();
        res.status(201).json(savedPack);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}