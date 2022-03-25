const { Router } = require('express');

//
const authRoute = require("./auth.js");
const folderRoute = require("./folder.js");
const itemRoute = require("./item.js");
//

const router = Router();

//
router.use("/auth", authRoute);
router.use("/folder",folderRoute);
router.use("/item",itemRoute);
//

module.exports = router;
