import mongoose from "mongoose";

const customSheetSchema = new mongoose.Schema({
    orderId : {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    state : {
        type: String,
        enum: ["new", "pending","printed"],
        default: "new",
    },
    items:{
        type: [{
            x: { type: Number, required: true },
            y: { type: Number, required: true },
            width: { type: String, required: true },
            height: { type: String, required: true },
            image: { type: String, required: true },
        }],
        required: true
    }
},{
    timestamps: true
})

const CustomSheet = mongoose.model("CustomSheet", customSheetSchema);

export default CustomSheet