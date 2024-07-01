const db = require('./db');
const helper = require('../helper');
const config = require('../config');


//----------------------------------GET/MOSTRAR--------------------------------
//GET DE TODOS LOS LIDERES 
async function getLideres(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT L.Cedula, L.Nombre AS NombreLideres, L.Apellido, L.Telefono, L.Correo, D.Nombre AS NombreDigitador FROM Lideres L
        INNER JOIN Digitadores D
        ON D.cedula = L.Id_digitadores
        LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }
  }
  
  
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
  


//-------------------------POST/INSERTAR-------------------------------

//INSERT LIDERES
async function insertLideres(lideres){
  const result = await db.query(
    `INSERT INTO Lideres (Cedula, Nombre, Apellido, Telefono, Correo, Id_barrio, Id_mesa_votacion, Id_puesto_votacion, Id_digitadores) 
     VALUES
    ('${lideres.Cedula}', ${lideres.Nombre}, ${lideres.Apellido}, ${lideres.Telefono}, ${lideres.Correo}, 
    ${lideres.Id_barrio}, ${lideres.Id_mesa_votacion}, ${lideres.Id_puesto_votacion}, ${lideres.Id_digitadores})`
  );

  let message = 'Error al insertar nuevo lider';

  if (result.affectedRows) {
    message = 'Lider creado con exito';
  }

  return {message};
}



//INSERT VOTANTES
async function insertVotantes(votantes){
  const result = await db.query(
    `INSERT INTO Votantes (Cedula, Nombre, Apellido, Telefono, Correo, Id_barrio, Id_mesa_votacion, Id_puesto_votacion, Id_digitadores) 
     VALUES
    ('${votantes.Cedula}', ${votantes.Nombre}, ${votantes.Apellido}, ${votantes.Telefono}, ${votantes.Correo}, 
    ${votantes.Id_barrio}, ${votantes.Id_mesa_votacion}, ${votantes.Id_puesto_votacion}, ${votantes.Id_digitadores})`
  );

  let message = 'Error al insertar nuevo votante';

  if (result.affectedRows) {
    message = 'Votante creado con exito';
  }

  return {message};
}






//--------------------------PUT/ACTUALIZAR-----------------------------

//UPDATE LIDERES 
async function updateLideres(cedula, lideres){
  const result = await db.query(
    `UPDATE Lideres 
    SET Cedula="${lideres.Cedula}", Nombre=${lideres.Nombre}, Apellido=${lideres.Apellido}, 
    Telefono=${lideres.Telefono}, Correo=${lideres.Correo}, Id_barrio=${lideres.Id_barrio}, Id_mesa_votacion=${lideres.Id_mesa_votacion},
    Id_puesto_votacion=${lideres.Id_puesto_votacion}, Id_digitadores=${lideres.Id_digitadores}
    WHERE Cedula=${cedula}` 
  );

  let message = 'Error al actualizar el lider';

  if (result.affectedRows) {
    message = 'Lider actualizado con exito';
  }

  return {message};
}


//UPDATE VOTANTES
async function updateVotantes(cedula, votante){
  const result = await db.query(
    `UPDATE Lideres 
    SET Cedula="${votante.Cedula}", Nombre=${votante.Nombre}, Apellido=${votante.Apellido}, 
    Telefono=${votante.Telefono}, Correo=${votante.Correo}, Id_barrio=${votante.Id_barrio}, Id_mesa_votacion=${votante.Id_mesa_votacion},
    Id_puesto_votacion=${votante.Id_puesto_votacion}, Id_digitadores=${votante.Id_digitadores}
    WHERE Cedula=${cedula}` 
  );

  let message = 'Error al actualizar el votante';

  if (result.affectedRows) {
    message = 'Votante actualizado con exito';
  }

  return {message};
}





//--------------------------DELETE/ELIMINAR----------------------------

//DELETE LIDERES
async function deleteLider(cedula){
  const result = await db.query(
    `DELETE FROM Lideres WHERE Cedula=${cedula}`
  );

  let message = 'Error al eliminar lider';

  if (result.affectedRows) {
    message = 'Lider eliminado con exito';
  }

  return {message};
}



//DELETE VOTANTES
async function deleteVotante(cedula){
  const result = await db.query(
    `DELETE FROM Votantes WHERE Cedula=${cedula}`
  );

  let message = 'Error al eliminar votante';

  if (result.affectedRows) {
    message = 'Votante eliminado con exito';
  }

  return {message};
}









  module.exports = {
    getLideres,
    getVotantes,
    insertLideres,
    insertVotantes,
    updateLideres,
    updateVotantes,
    deleteLider,
    deleteVotante
  }


