import { Request, Response } from 'express';
import StickerModel from '../models/stickerSchema';

export const createSticker = async (req: Request, res: Response) => {
  try {
    const { name, imageURL, description, category , keywords } = req.body;
    const newSticker = new StickerModel({ name, imageURL, description, category, keywords });
    const savedSticker = await newSticker.save();
    res.status(201).json(savedSticker);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// get stickers based on category
export const getStickers = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;
    const stickers = await StickerModel.find({ category }).sort({ createdAt: -1 }).limit(30);
    res.json(stickers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
export const updateSticker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, imageURL, description } = req.body;
    const updatedSticker = await StickerModel.findByIdAndUpdate(
      id,
      { name, imageURL, description },
      { new: true }
    );
    res.json(updatedSticker);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteSticker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await StickerModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
