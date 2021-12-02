const { Router } = require("express");
const { postProfesor, getProfesores } = require("../controllers/Profesores");
const { validatorProfesor } = require("../validators/modelo");

const router = Router();

//* Obtener todas las practicas
//router.get('/practicas',validatorPracticas, getPracticas )

router.post('/',validatorProfesor, postProfesor)

//* Obtener todos los profesores
router.get('/allProfesores', getProfesores)

module.exports = router;