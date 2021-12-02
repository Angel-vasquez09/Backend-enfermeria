const { Router } = require("express");
const { getPracticas, postPractica, getIdPractica, getDatosPractica, getPracticasDocente, updateEstudiante } = require("../controllers/Practicas");
const { validatorPracticas } = require("../validators/modelo");

const router = Router();

router.post('/',validatorPracticas, postPractica );

//* Obtener todas las practicas
router.get('/', getPracticas );

//* Actualizar notas de estudiante
router.post('/actualizarEstudiante', updateEstudiante );

//* Obtener una practica por id
router.get('/:id', getIdPractica );/*  */

router.post('/:id', getDatosPractica );




//* Obtener las practicas de un docente
router.get('/practicaDocente/:id', getPracticasDocente );

module.exports = router;