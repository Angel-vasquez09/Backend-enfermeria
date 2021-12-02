const { response } = require("express");
const Profesores = require("../models/Profesores");
const bcryptjs = require('bcryptjs');
const { generarToken } = require("../helpers/generar-token");


const login = async(req, res = response) => {

    const { email, password } = req.body;


    try {
        // Verificar si el correo existe
        const profe = await Profesores.findOne({ email });
        

        if (!profe) {
            return res.status(400).json({
                msg: "Correo / password son incorrectos"
            })
        }

        
        // Verificar si el usuario esta activo en la base de datos
        if (!profe.estado) {
            return res.status(400).json({
                msg: "Correo / password son incorrectos"
            })
        }

        // Verificar la contraseña
        const veriPass = bcryptjs.compareSync(password, profe.password);

        if (!veriPass) {
            return res.status(400).json({
                msg: "Correo / password son incorrectos - password"
            })
        }

        // Generar el JWT
        const token = await generarToken(profe.id);



        res.json({
            profe,
            token
        })

    } catch (error) {
        console.log(error);
    }
}


const renovarToken = async(req, res = response) => {

    try {
        
        const usuario = req.user;

        const token = await generarToken(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
    }
    
}


module.exports = {
    renovarToken,
    login
}
