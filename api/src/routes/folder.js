const { Router } = require('express');
const Folder = require("../db");
const router = Router();

// Get All Folders (development purposes)
router.get('/',async(req,res)=>{
    try{
        const folder = await Folder.findAll();
        res.status(200).send(folder);
    }
    catch(e){
        res.status(500).send(e);
    }
})

// Get All Folders of a User
router.get('/:id',async(req,res)=>{
    try{
        const folder = await Folder.findAll({
            where:{id:req.params.id}
        });
        res.status(200).send(folder);
    }
    catch(e){
        res.status(500).send(e);
    }
})

// Create folder
router.post('/',async(req,res)=>{
    try{
        const {name} = req.body;
        let item = await Folder.create({
            name
        })
        item
            ? res.status(200).send({success:'Item created'})
            : res.status(400).send({error:'Error'})
    }
    catch(e){
        res.status(500).send({error:'Error'})
    }
})


module.exports = router;