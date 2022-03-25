const { Router } = require('express');
const { signUp, signIn } = require('../controllers/authController');
const {User} = require('../db.js');

const router = Router();

router.get("/", async (req,res)=>{
    User.findAll()
    .then(data=>{
        res.json(data);
    })
    .catch(e=>{return e;})
});
router.post('/signUp', signUp);
router.post('/signIn', signIn);

module.exports = router;