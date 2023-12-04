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
    serverTime:{
        type: Date,
        default: Date.now
    },
    sheetsIds : {
        // ref
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'OrderItem',
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
