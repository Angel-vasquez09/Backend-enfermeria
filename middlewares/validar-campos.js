const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {

    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(403);
        res.send( { errors: error.array() } );
    }

}

module.exports = {
    validarCampos
}