const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Profesores = require('../models/Profesores');


const validatorProfesor = [ // Validar Usuario
    check('nombre')
        .exists()
        .isLength({ min: 5 })
        .not()
        .isEmpty(),
    check('email')
        .exists()
        .not().isEmpty()
        .isEmail()
        .custom(async value => {
            const user = await Profesores.findOne({ email: value });
            if (user) {
                return Promise.reject("Email en uso");
            }
        }),
    check('password')
        .exists()
        .isLength({ min: 5 })
        .not()
        .isEmpty(),
    (req, res, next ) => {
        validarCampos(req,res,next)
    }
];


const validatorPracticas = [
    check('cedulaProfesores')
    .not().isEmpty(),
    check('estudiantes')
    .not().isEmpty(),
    check('notas')
    .not().isEmpty(),
    check('semestres')
    .not().isEmpty(),
    check('nombre')
    .exists()
    .not().isEmpty(),
    (req, res, next ) => {
        validarCampos(req,res,next)
    }
]

module.exports = {
    validatorProfesor,
    validatorPracticas
};