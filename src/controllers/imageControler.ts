// src/controllers/imageController.ts

import { Request, Response } from 'express';
import { Storage } from '@google-cloud/storage';
import config from '../config/googleCloudStorage';
import { Multer } from 'multer';


class ImageUpload {
  static uploadImage(req: any, res: Response) {
    const file = req?.file;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const storage = new Storage({
      projectId: config.projectId,
      keyFilename: config.keyFilename,
    });

    const bucket = storage.bucket(config.bucketName);
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      console.error('Error uploading to Google Cloud Storage:', err);
      res.status(500).send('Internal Server Error');
    });

    blobStream.on('finish', () => {
      console.log('Image uploaded to Google Cloud Storage.');
      res.status(200).send('Image uploaded successfully.');
    });

    blobStream.end(file.buffer);
  }
}

export default ImageUpload;
