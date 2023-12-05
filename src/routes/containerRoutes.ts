import express from "express";
import Container from "../models/containerSchema";
import Sheet from "../models/sheetSchema";
import OrderItem from "../models/orderItemSchema";

const router = express.Router()

router.get('/current',async (req, res) => {
    try{
        const current = await Container.findOne({state: 'filling'}).populate("sheetsIds")
        if(!current){
            return res.status(200).json(null)
        }
        return res.status(200).json(current)
    }catch(err){
        return res.status(500).json({message: err})
    }
})


router.get('/containers',async (req, res) => {
    try{
        // get top 10
        // get all the container with state != "filling"
        const containers = await Container.find({state: {'$ne': 'filling'}}).populate("sheetsIds").sort({createdAt: -1}).limit(10)
        return res.status(200).json(containers)
    }catch(err){
        return res.status(500).json({message: err})
    }
})


router.post('/add-to-container', async (req, res) => {
    try {
        
            const currentContainer = await Container.findOne({ state: "filling" });
            const {id} = req.body
            const orderItem = await OrderItem.findById(id)
            if(orderItem?.type === "cup" || orderItem?.type === "t-shirt"){
                await OrderItem.findByIdAndUpdate(id, { state: "ready" })
                return res.status(200).json(null)
            }else{
                if(currentContainer){
                    await Container.findByIdAndUpdate(currentContainer._id, {$inc: { sheets: 1 }, $push: { sheetsIds: id } });
                    if(currentContainer.sheetsIds.length == 3){
                        await Container.findByIdAndUpdate(currentContainer._id, {state: "ready"});
                        for(const _id of currentContainer.sheetsIds){
                            await OrderItem.findByIdAndUpdate(_id, {state: "ready"})
                        }
                        await OrderItem.findByIdAndUpdate(id, {container: currentContainer._id, state: "ready"})
                    }else{
                        await OrderItem.findByIdAndUpdate(id, {container: currentContainer._id, state: "inContainer"})
                    }
                    return res.status(200).json(currentContainer)
                }else{
                    const newContainer = new Container({
                        sheets: 1,
                        sheetsIds: [id]
                    });
                    await newContainer.save();
                    await OrderItem.findByIdAndUpdate(id, {container: newContainer._id, state: "inContainer"})
                    return res.status(200).json(newContainer)
                }
            }

    } catch (error) {
        console.log(error)
    }

})

export default router