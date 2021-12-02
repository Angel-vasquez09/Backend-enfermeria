const { response }     = require("express");
const Profesor = require("../models/Profesores");
const bcryptjs = require("bcryptjs");



const getProfesores = async(req, res = response) => {

    try {

        const profesores = await Profesor.find();

        if(profesores){
            res.json({ 
                profesores
            })
        }

    } catch (error) {
        throw new Error(error)
    }
}


const postProfesor = async(req, res = response) => {
    try {
        
        const { cedula, nombre, email, password, sexo } = req.body

        const profesor = new Profesor({ cedula, nombre, email, password, sexo });

        const salt = bcryptjs.genSaltSync();
    
        profesor.password = bcryptjs.hashSync(password, salt);

        const resp = await profesor.save();

        res.json(resp)
        

    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    getProfesores,
    postProfesor
}