import express , { Request, Response, Router } from 'express'

import Contact from '../models/contact'
const router: Router = express.Router();


// make new contact message

router.post('/create', async (req: Request, res: Response) => {
    console.log(req.body)
    try{
        const newContact = new Contact({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            message: req.body.message
        })
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    }catch(err){
        res.status(500).json({message: err});
        console.log(err)
    }
})

// get all the contact messages ordered with time

router.get('/all', async (req: Request, res: Response) => {
    try{
        const contacts = await Contact.find().sort({createdAt: -1});
        return res.status(200).json(contacts);
    }catch(err){
        return res.status(500).json({message: err});
    }
})



export default router