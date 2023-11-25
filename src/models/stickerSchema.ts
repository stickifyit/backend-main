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
  },
  keywords:{
    type: [String],
  },
  description: {
    type: String,
    trim: true,
  },
  pack: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    // required: true,
    trim: true,
  },
}, {
  timestamps: true
});

const Sticker = mongoose.model('Sticker', stickerSchema);

export default Sticker