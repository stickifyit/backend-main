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
    image: {
      type: String,
      required: true
    },
    size:{
        type: String,
        required: true
    }
});

const labelSchema = new mongoose.Schema({
    quantity: {
      type: Number,
      required: true
    },
    material: {
      type: String,
      required: true
    }
});
  
const cupSchema = new mongoose.Schema({
    quantity: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      required: true
    }
});
  
const t_shirtSchema = new mongoose.Schema({
    quantity: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
});









const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    enum: ['sticker', 'label', 'cup', 't_shirt'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  sticker: stickerSchema,
  label: labelSchema,
  cup: cupSchema,
  t_shirt: t_shirtSchema
  // Properties specific to each service type
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;