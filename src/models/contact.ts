import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{
    timestamps: true
})


export default mongoose.model("Contact", contactSchema)