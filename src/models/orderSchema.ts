import stickers_types from "../constants/stickers_types";
import mongoose from "mongoose";






const customSheet = new mongoose.Schema({
  type: { type: String ,default: "custom sheet", required: true},
  quantity : { type: Number, required: true},
  image : { type: String, required: true},
  sheetsId : { type: [String], required: false}, 
})  





  // items: {
  //   type: [{
  //       x: { type: Number, required: true },
  //       y: { type: Number, required: true },
  //       width: { type: String, required: true },
  //       height: { type: String, required: true },
  //       image: { type: String, required: true },
  //       id: { type: String, required: true },
  //     }
  //   ],
  //   required: true
  // }



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
  state: {
    type: String,
    enum: ["new", "pending","printed","packed", "delivered", "canceled"],
    default: "new",
  },
  cart:{
    type: [customSheet],
    required: false
  }
}, {

    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;