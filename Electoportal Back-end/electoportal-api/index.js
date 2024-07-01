const express = require('express');
const app = express();
const cors = require('cors');

//Uso de cors
app.use(cors());

//Definimos el puerto
const port = 3001

//ROUTES
const administrador = require('./routes/administrador');
const callcenter = require('./routes/callcenter');
const digitadores = require('./routes/digitadores');

//para que entienda archivos json
app.use(express.json());

//Para que entienda los formularios html atraves del link
app.use(express.urlencoded({extended: "true"}));

//Ejecucion de las funciones Administrador
app.use('/administrador', administrador);
//Ejecucion de las funciones Digitadores
app.use('/callcenter', callcenter);
//Ejecucion de las funciones Callcenter
app.use('/digitadores', digitadores);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });


//Ejecutar el servidor
app.listen(port, () =>{
    console.log(`Server on port ${port}`);
});







