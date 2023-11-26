import express, { Express, Request, Response } from 'express';
import connectDB from './config/db';
import errorMiddleware from './middlewares/errorMiddleware';



// routes
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import imageRoutes from './routes/imageRoutes';
import containerRoutes from './routes/containerRoutes';
import stickerRoutes from './routes/stickerRoutes';
import packRoutes from './routes/packRoutes'



import http from "http";
import { Storage } from '@google-cloud/storage';

import GCSConfig from "./config/googleCloudStorage"
import cors from "cors"

import {Server} from "socket.io"

// creating the app
const app: Express = express();

// use cors
app.use(cors())

// Middleware to parse JSON and handle raw binary data
app.use(express.json({ limit: '10mb'}));
app.use(express.raw({ limit: '10mb', type: 'image/*' }));


// Create a new instance of the Storage class with your configuration
const storage = new Storage({
  projectId: GCSConfig.projectId,
  keyFilename: GCSConfig.keyFilename,
});// 


// Use the storage instance to interact with Google Cloud Storage
const bucket = storage.bucket(GCSConfig.bucketName);


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with the specific origin allowed if possible
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/images',imageRoutes)
app.use('/containers',containerRoutes)
app.use('/sticker', stickerRoutes);
app.use('/packs', packRoutes);
app.post('/fetch-image', async (req: Request, res: Response) => {
  const url = req.body.url
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    res.send(`data:${response.headers.get('content-type') || 'image/png'};base64,${base64}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

// Error handling middleware
app.use(errorMiddleware);
// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express Server!');
});



// io server
const server = http.createServer(app)
export const io = new Server(server,{
  cors:{
    origin:"*", // this will allow the front and and the admin at once
    methods:["GET","POST"],
  }
})
// listen io events
io.on("connection",(socket)=>{
  console.log("a user connected")
  socket.on("add order",(data)=>{
    socket.broadcast.emit("add order",data)
    console.log("order added")
  })
  socket.on("disconnect",()=>{
    console.log("user disconnected")
  })
})
export default server;
