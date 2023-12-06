import express, { Request, Response } from 'express';
import { createPack, getPacks } from '../controllers/packController';
import Pack from '../models/packSchema';
import Sticker from '../models/stickerSchema';


const router = express.Router();

router.post('/create', createPack);
router.get('/all', getPacks)
// delete pack by id and all stickers in it 
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const deletedPack = await Pack.findByIdAndDelete(req.params.id);
        // now delete all the stickers with same packId
        await Sticker.deleteMany({ pack: req.params.id });
        return res.status(200).json(deletedPack);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
})

export default router