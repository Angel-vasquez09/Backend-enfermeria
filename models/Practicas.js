const { Schema, model } = require('mongoose');


const practicaSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de practica es requerido"]
    },
    cedulaProfesores: [
        {
            type: String,
            required: true
        }
    ],
    estudiantes: [
        {
            cedula: {
                type: String,
                required: true
            },
            nombresApellidos: {
                type: String,
                required: true
            },
            pendiente: {
                type: Boolean,
                default: false,
                required: true
            },
            notas: [
                {
                    notax: {
                        type: String,
                        default: ""
                    },
                    calificacion: {
                        type: Number,
                        default: 0.5
                    },
                    porcentaje: {
                        type: Number,
                        default: 0
                    }
                }
            ],
            notaFinal: {
                type: Number,
                default: 0
            }
        }
    ],
    notas: [
        {
            notax: {
                type: String,
                required: true
            },
            calificacion: {
                type: Number,
                default: 0.5,
                required: true
            },
            porcentaje: {
                type: Number,
                required: true
            },
            cedulaDocenteEncargado: {
                type: String,
                required: true
            }
        }
    ],
    semestres: [
        {
            type: String,
            required: true
        }
    ],
    estado: {
        type: Boolean,
        default: true
    }
})

// Quitamos el password y la __v del a respuesta de la base de datos
practicaSchema.methods.toJSON = function() {
    const {__v,_id, ...practica} = this.toObject();
    practica.id = _id; // Cambiamos el nombre del _id por uid
    return practica;
}


module.exports = model('Practica', practicaSchema);