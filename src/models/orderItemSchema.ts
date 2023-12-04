import mongoose from "mongoose"





const stickerSheetSchema = new mongoose.Schema({
    container: { type: String, required: true},
    data:{
        sheetId : { type: String, required: true},
    }
})

const cupSchema = new mongoose.Schema({
    quantity: { type: Number, required: true},
    data:{
        image : { type: String, required: true},
        type : { 
            type: String ,
            enum: ["cup"],
            required: true
        },
    }
})

const tShirtSchema = new mongoose.Schema({
    quantity: { type: Number, required: true},
    data:{
        image : { type: String, required: true},
        type: { 
            type: String, 
            enum:["center-chest","left-chest","back-side"],
            required: true
        }
    }
})



const orderItemSchema = new mongoose.Schema({
    state : { type: String, enum: ["new", "pending","printed"], default: "new", required: false},
    orderId: { type: String, required: true},
    image : { type: String, required: true},
    type: { type: String, required: true ,enum: ["sticker-sheet", "t-shirt", "cup"]},
    tShirtSchema,
    cupSchema,
    stickerSheetSchema
})

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem