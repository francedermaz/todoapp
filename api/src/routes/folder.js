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
            where:{userId:req.params.id}
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
        const {userId,name} = req.body;
        let folder = await Folder.create({
            name,
            userId
        })
        folder
            ? res.status(200).send({success:'Folder created'})
            : res.status(400).send({error:'Error'})
    }
    catch(e){
        res.status(500).send({error:'Error'})
    }
})

// Delete Folder
router.delete('/:id',async(req,res)=>{
    try{
        Folder.destroy({
            where: {
                id:parseInt(req.params.id),
            }
        })
        .then(function(deletedRecord) {
            deletedRecord===1
                ? res.status(200).json({message:"Deleted successfully"})
                : res.status(404).json({message:"Not found"})
        })
        .catch(function(error){
            res.status(500).json(error);
        });
    }
    catch(e){
        res.status(500).send({error: "Error"})
    }
})


module.exports = router;