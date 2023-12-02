import stickers_types from "../constants/stickers_types";
import mongoose from "mongoose";






const customSheet = new mongoose.Schema({
  type: { type: "custom sheet", required: true},
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
  closed: {
    type: Boolean,
    required: false,
    default: false
  },
  number: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
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
  state: {
    type: String,
    enum: ["pending", "waiting","printed","packed", "delivered", "canceled"],
    default: "pending",
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