//* EJEMPLO PARA CREAR UN MODELO CON MONGOOSE
const {Schema, model} = require('mongoose');


const profesorSchema = Schema({
    cedula: {
        type: String,
        required: [true, "Nombre obligatorio"]
    },
    nombre: {
        type: String,
        required: [true, "Nombre obligatorio"]
    },
    sexo: {
        type   : String,
        default: 'NO_DEFINIDO',
        enum   : ['HOMBRE','MUJER','NO_DEFINIDO']
    },
    email: {
        type: String,
        required: [true, "Correo obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Contraseña obligatoria"]
    },
    role: {
        type: String,
        default: "PROFESOR",
        enum: ["ADMIN", "PROFESOR"]
    },
    estado: {
        type: Boolean,
        default: true
    }
})

// Quitamos el password y la __v del a respuesta de la base de datos
profesorSchema.methods.toJSON = function() {
    const {__v,password,_id, ...profesor} = this.toObject();
    profesor.id = _id; // Cambiamos el nombre del _id por uid
    return profesor;
}


module.exports = model('Profesor', profesorSchema);