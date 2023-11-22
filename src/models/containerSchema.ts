import mongoose from "mongoose"

const containerSchema = new mongoose.Schema({
    isOpen : {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    sheets : {
        type: Number,
        default: 0
    },
    state : {
        type: String,
        enum: ['filling', 'ready','printed','delivering','delivered'],
        default: 'filling'
    }
},{
    timestamps: true
});

const Container = mongoose.model('Container', containerSchema);

export default Container;
