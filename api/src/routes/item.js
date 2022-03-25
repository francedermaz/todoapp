const { Router } = require('express');
const {Item} = require("../db");
const router = Router();

// Get All Items (development purposes)
router.get('/',async(req,res)=>{
    try{
        const items = await Item.findAll();
        res.status(200).send(items);
    }
    catch(e){
        res.status(500).send(e);
    }
})

// Get All Items of a User
router.get('/:id',async(req,res)=>{
    try{
        const items = await Item.findAll({
            where:{id:req.params.id}
        });
        res.status(200).send(items);
    }
    catch(e){
        res.status(500).send(e);
    }
})

// Create items
router.post('/',async(req,res)=>{
    try{
        const {name} = req.body;
        let item = await Item.create({
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

// Update Item
router.put('/:id',async(req,res)=>{
    try{
        Item.findByPk(req.params.id)
        .then(data=>{
            data.update({
                name: req.body.name,
            })
            .then(response=>{res.status(200).json(response)})
            .catch(e=>{res.status(500).json({e})});
        })
        .catch(e=>res.status(500).json({e}))
    }
    catch(e){
        res.status(500).send({error:'Error'})
    }
})

// Delete Item
router.delete('/:id',async(req,res)=>{
    try{
        Item.destroy({
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