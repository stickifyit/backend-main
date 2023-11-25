import express from 'express';
import { createPack, getPacks } from '../controllers/packController';


const router = express.Router();

router.post('/create', createPack);
router.get('/all', getPacks)


export default router