const express     = require("express");
const cors        = require("cors");
const path        = require("path");
const { bdConection } = require("../config/bd");

class Server {
    
    //? NOTA: Si vas a utilizar socket habilita lo que esta comentado o borralo si no lo necesitas

    constructor(){
        this.app  = express();
        this.port = process.env.PORT; 

        this.conectadBD();

        this.middleware();

        this.routes()

    }

    middleware(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    async conectadBD(){
        await bdConection();
    }


    routes(){ 
        
        this.app.use('/practicas',require('../routes/Practicas'));
        
        this.app.use('/profesor',require('../routes/Profesores'));

        this.app.use('/auth', require('../routes/Auth'));

        this.app.use('/admin', require('../routes/Auth'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto ${this.port}!`)
        })
    }
}

module.exports = Server;