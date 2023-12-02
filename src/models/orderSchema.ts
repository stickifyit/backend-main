import stickers_types from "../constants/stickers_types";
import mongoose from "mongoose";






const customSheet = new mongoose.Schema({
  quantity : { type: Number, required: true},
  image : { type: String, required: true},
  items: {
    type: [{
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        width: { type: String, required: true },
        height: { type: String, required: true },
        image: { type: String, required: true },
        id: { type: String, required: true },
        size: { type: Number, required: true },
      }
    ],
    required: true
  }
})  




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
  cart:{
    type: [customSheet],
    required: true
  }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;