import mongoose from 'mongoose'


const sheetSchema = new mongoose.Schema({
  container: {
    type: mongoose.Schema.Types.ObjectId,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Reference to the Order model
    required: true
  },
  snapshot:{
    type: String,
    required: true
  },
  stickerUrl: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

const Sheet = mongoose.model('Sheet', sheetSchema);

export default Sheet;
