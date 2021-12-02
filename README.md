# MODELO NODEJS

Es un modelo de un backend con nodejs, express, mongodb, mongoose, 
jsonwebtoken,motor de plantilla express-handlebars, manejo de errores con express-validator y tambien incluye socket

## Installation
Instala los archivos node_modules
```bash
npm install
```
## .ENV
Enviroment
```bash
#PORT en el puerto que quieras que trabaje tu servidor
PORT=8089 

#MONGODB es la conexion que creastes en mongodbAtlas
MONGODB = mongodb+srv://<Usuario>:<Password>@mibase.tiy1b.mongodb.net/<Nombre_de_la_base_de_datos>

#SECRETOPRIVATEKEY = es una llave privada segura que tienes que crear para generar un token, lo importatnte es que sea segura
SECRETOPRIVATEKEY = Mi_nombre-1234_llave_privada
ó
SECRETOPRIVATEKEY = m1ll4v3pr1v4d4.com
```