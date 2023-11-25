import mongoose from "mongoose"

const stickerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imageURL: {
    type: String,
    required: true,
    trim: true,
  },
  keywords:{
    type: [String],
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Sticker = mongoose.model('Sticker', stickerSchema);

export default Sticker