// src/controllers/imageController.ts

import { Request, Response } from 'express';
import { Storage } from '@google-cloud/storage';
import config from '../config/googleCloudStorage';


class ImageUpload {
  static uploadImage(req: any, res: Response) {
    const file = req?.file;
    var { folder } = req?.body;
    if(!folder) {
      folder = "uploads";
    }

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const storage = new Storage({
      projectId: config.projectId,
      keyFilename: config.keyFilename,
    });
    try{
    const bucket = storage.bucket(config.bucketName);
    const ID = Math.random().toString(36).substring(2, 15) +"-"+ Math.random().toString(36).substring(2, 15) +"-"+ Math.random().toString(36).substring(2, 15);
    const fileName = `${folder}/${ID}.png`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      console.error('Error uploading to Google Cloud Storage:', err);
      res.status(500).send('Internal Server Error');
    });

    blobStream.on('finish', () => {
      console.log('Image uploaded to Google Cloud Storage.');
      console.log(fileName)
      res.status(200).send({name:fileName});
    });

    blobStream.end(file.buffer);


    }catch(error){
      console.log(error);
    }






  }
}

export default ImageUpload;
