const { Router } = require('express');
const Folder = require("../db");
const router = Router();

// Get All Folders
router.get('/',async(req,res)=>{
    try{
        const folder = await Folder.findAll();
        res.status(200).send(folder);
    }
    catch(e){
        res.status(500).send(e);
    }
})


module.exports = router;