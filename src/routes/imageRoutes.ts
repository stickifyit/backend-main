// src/routes/imageRoutes.ts

import express from 'express';
import multer from 'multer';
import ImageController from '../controllers/imageControler';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), ImageController.uploadImage);

export default router;
