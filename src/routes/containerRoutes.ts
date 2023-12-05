import express from "express";
import Container from "../models/containerSchema";
import Sheet from "../models/sheetSchema";

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
        const containers = await Container.find({state: {'$ne': 'filling'}}).sort({createdAt: -1}).limit(10)
        return res.status(200).json(containers)
    }catch(err){
        return res.status(500).json({message: err})
    }
})


export default router