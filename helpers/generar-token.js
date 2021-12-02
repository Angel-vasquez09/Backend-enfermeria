const jwt = require('jsonwebtoken');
const Profesor = require('../models/Profesores');

//? const { Usuario } = require('../models') Modelo de usuario al que le quieras crear un token o verificar su token

const generarToken = (uid = '') => {

    return new Promise( (resolve, reject) => {

        const cargaUtil = { uid };

        jwt.sign(cargaUtil, process.env.SECRETOPRIVATEKEY, {
            expiresIn: '10h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo crear el token')
            }else{
                resolve(token);
            }
        })

    })
}


const comprobarToken = async(token = '') => {

    try {
        
        if(token.length <= 10){
            return null;
        }

        const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

        const usuario = await Profesor.findById(uid);

        if (usuario) {
            if (usuario.estado) {
                return usuario;
            }
        }


    } catch (error) {
        return null;
    }

}


module.exports = {
    generarToken,
    comprobarToken
}
