const { response }     = require("express");
const Practica = require("../models/Practicas");



const getPracticas = async (req, res = response) => {

    try {

        const practicas = await Practica.find();

        res.json({ 
            practicas
        })
        
        
    } catch (error) {
        res.json({ error })
    }
    
}


const postPractica = async(req, res = response) => {
    try {
        
        const { nombre, cedulaProfesores, 
                estudiantes, notas, 
                semestres } = req.body;
        
        const newPractica = new Practica({ nombre, cedulaProfesores, 
            estudiantes, notas, 
            semestres });

        const resp = await newPractica.save();

        res.json(resp)
        

    } catch (error) {
        res.json(error);
        throw new Error(error)
    }
}


const getIdPractica = async(req, res = response) => {
    try {

        const { id } = req.params;

        const datosPractica = await Practica.findById(id)
        
        let aprobados = 0;
        let reprobados = 0;
        let pendientes = 0;
        let semests = []
        datosPractica.estudiantes.forEach(estudiante => {
            if(!estudiante.pendiente){
                pendientes++;
            }
            if(estudiante.notaFinal >= 3){
                aprobados++;
            }else{
                reprobados++;
            }
            

        });

        datosPractica.semestres.forEach(semestre => {
            semests.push(semestre);
        })

        const info = {
            codigo: datosPractica.id,
            nombre: datosPractica.nombre,
            numEstudiantes: datosPractica.estudiantes.length,
            aprobados: aprobados,
            reprobados: reprobados,
            semestres: semests,
            pendientes: pendientes
        }
        res.json({
            datosPractica,
            info
        })
        
    } catch (error) {
        res.json({error});
    }
}

//* Actualizar estudiante de practica
const updateEstudiante = async(req, res = response) => {
    try {

        const { codPractica,cedulaAlumno, notasAlumno } = req.body;
        
        
        const practica = await Practica.findById(codPractica);
        const estudiantes = practica.estudiantes;
        let updateAlumno = estudiantes.filter(a => a.cedula === cedulaAlumno);
        updateAlumno[0].notas = notasAlumno;
        let update = estudiantes.filter(a => a.cedula !== cedulaAlumno);
        update.push(updateAlumno[0]);
        practica.estudiantes = update;
        await practica.save();
        //updateAlumno[0].pendiente = false;
        
        res.json({
            practica
        })

    } catch (error) {
        res.json({
            error: "Error al actualizar"
        })
        console.log("Error en alguna parte")
        console.log(error);
    }
}

//* Obtener practicas del docente X
const getPracticasDocente = async(req, res = response) => {
    try {
    
        const practicas = await Practica.find({ cedulaProfesores: req.params.id })
        res.json(practicas)
    } catch (error) {

        console.log(error);
    
    }
}


// Guardar estudiante en practica
const getDatosPractica = async(req, res = response) => {

    try {
        
        const { id } = req.params;
        const { data } = req.body;

        const practica = await Practica.findById(id)
        const estudiantes = practica.estudiantes;
        estudiantes.push(data);

        res.json({ 
            estudiantes
        })


    } catch (error) {
        
    }
}


module.exports = {
    getPracticas,
    postPractica,
    getIdPractica,
    getDatosPractica,
    getPracticasDocente, 
    updateEstudiante
}