const db = require('./db');
const helper = require('../helper');
const config = require('../config');


//GET DE TODOS LOS VOTANTES
async function getVotantes(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT V.Cedula, V.Nombre AS NombreVotantes, V.Apellido, V.Telefono, V.Correo, 
      B.Nombre_barrio AS NombreBarrio, M.Numero AS NumeroMesa, P.Id_puesto_votacion AS PuestoVotacion, D.Nombre AS NombreDigitador FROM Votantes V
      INNER JOIN Barrios B
      ON B.Id_barrio = V.Id_barrio 
      INNER JOIN Mesa_votacion M
      ON M.Id_mesa_votacion = V.Id_mesa_votacion
      INNER JOIN Puesto_votacion P
      ON P.Id_puesto_votacion = V.Id_puesto_votacion
      INNER JOIN Digitadores D
      ON D.cedula = V.Id_digitadores LIMIT ${offset},${config.listPerPage}`
    );
  
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }
  }


//AGREGAR FUNCION GET BY ID
  
  module.exports = {
    getVotantes
  }


  
  