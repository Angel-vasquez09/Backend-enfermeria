const { Router } = require("express");
const { check } = require("express-validator");
const { renovarToken, login } = require("../controllers/Auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarToken } = require("../middlewares/validar-token");




const router = Router();

router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
] ,login);


router.get('/validarToken',[
    validarToken,
], renovarToken);


module.exports = router;