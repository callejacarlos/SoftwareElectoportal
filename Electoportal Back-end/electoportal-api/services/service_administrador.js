const db = require('./db');
const helper = require('../helper');
const config = require('../config');

//----------------------PARA VALIDAR EL LOGIN-------------------------
//ADMINISTRADORES
async function validateAdministrador(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Correo, Contrasena FROM Administradores 
     LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

//DIGITADORES
async function validateDigitador(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Correo, Contrasena FROM Digitadores 
     LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
//CALLCENTER
async function validateCallcenter(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Correo, Contrasena FROM Callcenter 
     LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


//-------------------------------------------GETTER---------------------------------------------- 
//Get de todos los administradores 
async function getAdministradores(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Cedula, Cedula AS id_administrador, Nombre FROM Administradores 
     LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


//Get de todos los Digitadores registrados y el administrador asociado
async function getDigitadores(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const limit = Number(config.listPerPage);

  console.log('Offset:', offset);
  console.log('Limit:', limit);
  
  const rows = await db.query(
    `SELECT D.Cedula, D.Nombre AS NombreDigitador, D.Apellido, D.Telefono, D.Correo, D.Contrasena, A.Nombre AS NombreAdministrador, A.cedula AS CedulaAdministrador FROM Digitadores D
    INNER JOIN Administradores A
    ON D.id_administrador = A.Cedula LIMIT ${offset}, ${limit}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

//Get de todos los callcenter registrados y el administrador asociado
async function getCallcenter(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT C.Cedula, C.Nombre AS NombreCallcenter, C.Apellido, C.Telefono, C.Correo, C.Contrasena, A.Nombre AS NombreAdministrador, A.Cedula AS CedulaAdministrador FROM Callcenter C
    INNER JOIN Administradores A
    ON C.id_administrador = A.Cedula LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


//GET DE TODOS LOS LIDERES 
async function getLideres(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT L.Cedula, L.Nombre AS NombreLideres, L.Apellido, L.Telefono, L.Correo, 

    B.Nombre_barrio AS NombreBarrio, B.Id_barrio,
    M.Numero AS NumeroMesa, M.Id_mesa_votacion,
    P.sede AS PuestoVotacion, P.Id_puesto_votacion,
    D.Nombre AS NombreDigitador, D.Cedula AS CedulaDigitador
    
    FROM Lideres L
    INNER JOIN Barrios B
    ON B.Id_barrio = L.Id_barrio 
    INNER JOIN Mesa_votacion M
    ON M.Id_mesa_votacion = L.Id_mesa_votacion
    INNER JOIN Puesto_votacion P
    ON P.Id_puesto_votacion = L.Id_puesto_votacion
    INNER JOIN Digitadores D
    ON D.cedula = L.Id_digitadores LIMIT ${offset},${config.listPerPage}`
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

    B.Nombre_barrio AS NombreBarrio, B.Id_barrio,
    M.Numero AS NumeroMesa, M.Id_mesa_votacion,
    P.sede AS PuestoVotacion, P.Id_puesto_votacion,
    D.Nombre AS NombreDigitador, D.Cedula AS CedulaDigitador
    
    FROM Votantes V
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


//GET DE LOS PUESTOS DE VOTACION
async function getPuestoVotacion(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Id_puesto_votacion ,sede FROM Puesto_votacion LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


//GET DE LAS MESAS DE VOTACION
async function getMesaVotacion(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Id_mesa_votacion ,Numero FROM Mesa_votacion LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


//GET DE LOS BARRIOS
async function getBarrios(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Id_barrio, Nombre_barrio FROM Barrios LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


//------------------------------------INSERT------------------------------------


//PORT -> INSERTAR DATOS
//INSERTAR DIGITAODRES 
async function insertDigitadores(digitador){
  const result = await db.query(
    `INSERT INTO Digitadores (Cedula, Nombre, Apellido, Telefono, Correo, Contrasena, id_administrador)
     VALUES
    (${digitador.Cedula}, '${digitador.Nombre}', '${digitador.Apellido}', '${digitador.Telefono}', '${digitador.Correo}', '${digitador.Contrasena}', ${digitador.id_administrador})`
  );

  let message = 'Error al insertar el nuevo digitador';

  if (result.affectedRows) {
    message = 'Digitador creado con exito';
  }

  return {message};
}


//INSERTAR CALLCENTER
async function insertCallcenter(callcenter){
  const result = await db.query(
    `INSERT INTO Callcenter (Cedula, Nombre, Apellido, Telefono, Correo, Contrasena, id_administrador)
     VALUES
    (${callcenter.Cedula}, '${callcenter.Nombre}', '${callcenter.Apellido}', '${callcenter.Telefono}', '${callcenter.Correo}', '${callcenter.Contrasena}', ${callcenter.id_administrador})`
  );

  let message = 'Error al insertar el nuevo callcenter';

  if (result.affectedRows) {
    message = 'Callcenter creado con exito';
  }

  return {message};
}


//INSERT LIDERES
async function insertLideres(lideres){
  const result = await db.query(
    `INSERT INTO Lideres (Cedula, Nombre, Apellido, Telefono, Correo, Id_barrio, Id_mesa_votacion, Id_puesto_votacion, Id_digitadores) 
     VALUES
    (${lideres.Cedula}, '${lideres.Nombre}', '${lideres.Apellido}', '${lideres.Telefono}', '${lideres.Correo}', 
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
    (${votantes.Cedula}, '${votantes.Nombre}', '${votantes.Apellido}', '${votantes.Telefono}', '${votantes.Correo}', 
    ${votantes.Id_barrio}, ${votantes.Id_mesa_votacion}, ${votantes.Id_puesto_votacion}, ${votantes.Id_digitadores})`
  );

  let message = 'Error al insertar nuevo votante';

  if (result.affectedRows) {
    message = 'Votante creado con exito';
  }

  return {message};
}




//-------------------------------UPDATE-----------------------------------------

//UPDATE DIGITADORES
async function updateDigitadores(cedula, digitador){
  const result = await db.query(
    `UPDATE Digitadores 
    SET Cedula=${digitador.Cedula}, Nombre='${digitador.Nombre}', Apellido='${digitador.Apellido}', 
    Telefono='${digitador.Telefono}', Correo='${digitador.Correo}', Contrasena='${digitador.Contrasena}', id_administrador='${digitador.id_administrador}' 
    WHERE Cedula=${cedula}` 
  );

  let message = 'Error al actualizar el digitador';

  if (result.affectedRows) {
    message = 'Digitador actualizado con exito';
  }

  return {message};
}


//UPDATE CALLCENTER
async function updateCallcenter(cedula, callcenter){
  const result = await db.query(
    `UPDATE Callcenter 
    SET Cedula=${callcenter.Cedula}, Nombre='${callcenter.Nombre}', Apellido='${callcenter.Apellido}', 
    Telefono='${callcenter.Telefono}', Correo='${callcenter.Correo}', Contrasena='${callcenter.Contrasena}', id_administrador=${callcenter.id_administrador} 
    WHERE Cedula=${cedula}` 
  );

  let message = 'Error al actualizar';

  if (result.affectedRows) {
    message = 'Callcenter actualizado con exito';
  }

  return {message};
}


//UPDATE LIDERES 
async function updateLideres(cedula, lideres){
  const result = await db.query(
    `UPDATE Lideres 
    SET Cedula=${lideres.Cedula}, Nombre='${lideres.Nombre}', Apellido='${lideres.Apellido}', 
    Telefono='${lideres.Telefono}', Correo='${lideres.Correo}', Id_barrio=${lideres.Id_barrio}, Id_mesa_votacion=${lideres.Id_mesa_votacion},
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
    `UPDATE Votantes 
    SET Cedula=${votante.Cedula}, Nombre='${votante.Nombre}', Apellido='${votante.Apellido}', 
    Telefono='${votante.Telefono}', Correo='${votante.Correo}', Id_barrio=${votante.Id_barrio}, Id_mesa_votacion=${votante.Id_mesa_votacion},
    Id_puesto_votacion=${votante.Id_puesto_votacion}, Id_digitadores=${votante.Id_digitadores}
    WHERE Cedula=${cedula}` 
  );

  let message = 'Error al actualizar el votante';

  if (result.affectedRows) {
    message = 'Votante actualizado con exito';
  }

  return {message};
}





//--------------------------------DELETE-----------------------------------------

//DELETE DIGITADORES
async function deleteDigitador(cedula){
  const result = await db.query(
    `DELETE FROM Digitadores WHERE Cedula=${cedula}`
  );

  let message = 'Error al eliminar el lenguaje de programacione';

  if (result.affectedRows) {
    message = 'Lenguaje de programacion eliminado con exito';
  }

  return {message};
}



//DELETE CALLCENTER
async function deleteCallcenter(cedula){
  const result = await db.query(
    `DELETE FROM Callcenter WHERE Cedula=${cedula}`
  );

  let message = 'Error al eliminar callcenter';

  if (result.affectedRows) {
    message = 'Callcenter eliminado con exito';
  }

  return {message};
}



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








//NUEVO PARA PRUEBA--------------------------------------------------------------

// Función para obtener un solo registro por Cedula
async function getById(cedula) {
    const rows = await db.query(
      `SELECT Cedula, Nombre, Apellido, Telefono, Correo, Contrasena 
       FROM Digitadores WHERE Cedula = ?`, [cedula]
    );
    const data = helper.emptyOrRows(rows);
    return data[0];
  }
   
  // Función para insertar un nuevo registro
  async function create(digitador) {
    const result = await db.query(
      `INSERT INTO Digitadores 
       (Cedula, Nombre, Apellido, Telefono, Correo, Contrasena) 
       VALUES (?, ?, ?, ?, ?, ?)`, 
      [digitador.Cedula, digitador.Nombre, digitador.Apellido, digitador.Telefono, digitador.Correo, digitador.Contrasena]
    );
    return {
      message: result.affectedRows ? 'Digitador creado exitosamente' : 'Error en la creación del Digitador'
    };
  }
  
  // Función para actualizar un registro existente
  async function update(cedula, digitador) {
    const result = await db.query(
      `UPDATE Digitadores 
       SET Nombre = ?, Apellido = ?, Telefono = ?, Correo = ?, Contrasena = ?
       WHERE Cedula = ?`, 
      [digitador.Nombre, digitador.Apellido, digitador.Telefono, digitador.Correo, digitador.Contrasena, cedula]
    );
    return {
      message: result.affectedRows ? 'Digitador actualizado exitosamente' : 'Error en la actualización del Digitador'
    };
  }
  
  // Función para eliminar un registro
  async function remove(cedula) {
    const result = await db.query(
      `DELETE FROM Digitadores WHERE Cedula = ?`, [cedula]
    );
    return {
      message: result.affectedRows ? 'Digitador eliminado exitosamente' : 'Error en la eliminación del Digitador'
    };
  }
  



module.exports = {
  getDigitadores,
  getCallcenter,
  getLideres,
  getVotantes,
  getMesaVotacion,
  getPuestoVotacion,
  getBarrios,
  insertDigitadores,
  insertCallcenter,
  insertLideres,
  insertVotantes,
  updateDigitadores,
  updateCallcenter,
  updateLideres,
  updateVotantes,
  deleteDigitador,
  deleteCallcenter,
  deleteLider,
  deleteVotante,
  getAdministradores,
  validateAdministrador,
  validateDigitador,
  validateCallcenter,

  getById,
  create,
  update,
  remove
}

