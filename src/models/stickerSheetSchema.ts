import mongoose from "mongoose"

const stickerSheetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false,
        default: "No description"
    },
    snapshot:{
        type: String,
        required: true
    },
})



const StickerSheet = mongoose.model('StickerSheet', stickerSheetSchema);

export default StickerSheet