const { Router } = require('express');

//
const authRoute = require("./auth.js");
//

const router = Router();

//
router.use("/auth", authRoute);
//

module.exports = router;
