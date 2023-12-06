import express , { Request, Response, Router } from 'express'

import StickerSheet from '../models/stickerSheetSchema';
const router: Router = express.Router();



router.post('/create', (req: Request, res: Response) => {
    try {
        const newStickerSheet = new StickerSheet({
            snapshot: req.body.snapshot,
            name: req.body.name,
            description: req.body?.description,
        })
        newStickerSheet.save()
        res.status(201).json(newStickerSheet)
    } catch (error) {
        console.log(error)
    }
})
router.get('/all', async (req: Request, res: Response) => {
    try {
        const stickerSheets = await StickerSheet.find().sort({ createdAt: -1 }).limit(12);
        return res.status(200).json(stickerSheets);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
})
// get by name 
router.get("/:name", async (req: Request, res: Response) => {
    try {
        const stickerSheet = await StickerSheet.findOne({ name: req.params.name });
        return res.status(200).json(stickerSheet);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
})


export default router