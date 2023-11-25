import express from 'express';
import { createSticker, updateSticker, deleteSticker, getStickers } from '../controllers/stickersController';

const router = express.Router();

router.post('/create', createSticker);
router.put('/update/:id', updateSticker);
router.delete('/delete/:id', deleteSticker);
router.post('/get-by-pack', getStickers)
export default router;
