const { Router } = require('express');
const Item = require("../db");
const router = Router();

// Get All Items
router.get('/',async(req,res)=>{
    try{
        const items = await Item.findAll();
        res.status(200).send(items);
    }
    catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;