import mongoose from "mongoose";

const packSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    imageURL :{
        type: String,
        required: true,
    },
    keywords:{
        type: [String],
    },
    category: {
        type: String,
        // required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    }

},{
    timestamps: true
})

const Pack = mongoose.model("Pack", packSchema);
export default Pack
