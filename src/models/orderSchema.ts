import stickers_types from "../constants/stickers_types";

import mongoose from "mongoose";




// Define schema for each service
const stickerSchema = new mongoose.Schema({
    design: {
      type: String,
      required: true
    },
    type: {
        type:String,
        enum: stickers_types,
        required: true
    },
    size:{
        type: String,
        required: true
    }
});


  




const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true
  },

  number: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  serviceType: {
    type: String,
    enum: ['sticker', 'label', 'cup', 't_shirt'],
    required: true
  },
  sticker: stickerSchema,
  // Properties specific to each service type
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;