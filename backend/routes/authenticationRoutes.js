const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationRoutes.js");

router.post("/signin", authenticationController.signin);
router.post("/signup", authenticationController.signup);

module.exports = router;
