const path = require("path");
const express = require("express");
const router = express.Router();
const routersignup=require("../controller/signup");

router.get("/", routersignup.getlogin);
router.post("/",routersignup.postlogin);

module.exports = router;
