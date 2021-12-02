const { Router } = require("express");
const { check } = require("express-validator");
const { renovarToken } = require("../controllers/Auth");




const router = Router();

router.post('/home',[] ,login);



module.exports = router;