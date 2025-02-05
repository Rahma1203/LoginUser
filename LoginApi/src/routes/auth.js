
const express = require("express");
const Login= require("../controller/login");
const {validatorRegister,  validatorLogin} = require("../validators/auth")


const router = express.Router();


router.post("/register",validatorRegister, Login.registerCtrl );

router.post("/login",validatorLogin, Login.loginCtrl );


module.exports = router;