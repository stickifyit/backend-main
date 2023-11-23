import express, { Express, Request, Response } from 'express';
import connectDB from './config/db';
import errorMiddleware from './middlewares/errorMiddleware';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import imageRoutes from './routes/imageRoutes';
import containerRoutes from './routes/containerRoutes';
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

// Routes
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/images',imageRoutes)
app.use('/containers',containerRoutes)

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
