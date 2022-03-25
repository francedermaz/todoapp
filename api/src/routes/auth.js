const { Router } = require('express');
const { signUp, signIn } = require('../controllers/authController');

const router = Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);

module.exports = router;