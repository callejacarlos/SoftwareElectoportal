const express = require('express');
const router = express.Router();
const administrador = require('../services/service_administrador');

//----------------PARA VALIDAR EL LOGIN-------------------
//ADMINISTRADOR
router.get('/validateAdministrador', async function(req, res, next) {
  try {
    res.json(await administrador.validateAdministrador(req.query.page));
  } catch (err) {
    console.error(`Error al validar `, err.message);
    next(err);
  }
});

//DIGITADOR
router.get('/validateDigitador', async function(req, res, next) {
  try {
    res.json(await administrador.validateDigitador(req.query.page));
  } catch (err) {
    console.error(`Error al validar `, err.message);
    next(err);
  }
});

//CALLCENTER
router.get('/validateCallcenter', async function(req, res, next) {
  try {
    res.json(await administrador.validateCallcenter(req.query.page));
  } catch (err) {
    console.error(`Error al validar `, err.message);
    next(err);
  }
});




//--------------------------------GETTER---------------------------------
//Get Administradores
router.get('/', async function(req, res, next) {
  try {
    res.json(await administrador.getAdministradores(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los datos `, err.message);
    next(err);
  }
});


//Get Digitadores
router.get('/digitadores', async function(req, res, next) {
  try {
    res.json(await administrador.getDigitadores(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los datos `, err.message);
    next(err);
  }
});

//Get Callcenter
router.get('/callcenter', async function(req, res, next) {
  try {
    res.json(await administrador.getCallcenter(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los datos `, err.message);
    next(err);
  }
});

//Get Lideres
router.get('/lideres', async function(req, res, next) {
  try {
    res.json(await administrador.getLideres(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los datos `, err.message);
    next(err);
  }
});

//Get Votantes
router.get('/votantes', async function(req, res, next) {
  try {
    res.json(await administrador.getVotantes(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los datos `, err.message);
    next(err);
  }
});

//Get Puestos de votacion
router.get('/puestovotacion', async function(req, res, next) {
  try {
    res.json(await administrador.getPuestoVotacion(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los datos `, err.message);
    next(err);
  }
});

//Get mesas de votacion
router.get('/mesasvotacion', async function(req, res, next) {
  try {
    res.json(await administrador.getMesaVotacion(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los datos `, err.message);
    next(err);
  }
});

//Get Barrios
router.get('/barrios', async function(req, res, next) {
  try {
    res.json(await administrador.getBarrios(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los datos `, err.message);
    next(err);
  }
});


//-------------------------------INSERT/POST----------------------------------
//INSERT DIGITADORES
router.post('/digitadores', async function(req, res, next) {
  try {
    res.json(await administrador.insertDigitadores(req.body));
  } catch (err) {
    console.error(`Error al insertar el digitador`, err.message);
    next(err);
  }
});


//INSERT CALLCENTER
router.post('/callcenter', async function(req, res, next) {
  try {
    res.json(await administrador.insertCallcenter(req.body));
  } catch (err) {
    console.error(`Error al insertar el callcenter`, err.message);
    next(err);
  }
});


//INSERT LIDERES
router.post('/lideres', async function(req, res, next) {
  try {
    res.json(await administrador.insertLideres(req.body));
  } catch (err) {
    console.error(`Error al insertar lideres`, err.message);
    next(err);
  }
});



//INSERT VOTANTES
router.post('/votantes', async function(req, res, next) {
  try {
    res.json(await administrador.insertVotantes(req.body));
  } catch (err) {
    console.error(`Error al insertar votantes`, err.message);
    next(err);
  }
});



//------------------------UPDATE/PUT---------------------------

//UPDATE DIGITADORES
router.put('/digitadores/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.updateDigitadores(req.params.cedula, req.body));
  } catch (err) {
    console.error(`Error al actualizar digitador`, err.message);
    next(err);
  }
});


//UPDATE CALLCENTER
router.put('/callcenter/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.updateCallcenter(req.params.cedula, req.body));
  } catch (err) {
    console.error(`Error al actualizar callcenter`, err.message);
    next(err);
  }
});


//UPDATE LIDERES
router.put('/lideres/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.updateLideres(req.params.cedula, req.body));
  } catch (err) {
    console.error(`Error al actualizar lider`, err.message);
    next(err);
  }
});


//UPDATE VOTANTES
router.put('/votantes/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.updateVotantes(req.params.cedula, req.body));
  } catch (err) {
    console.error(`Error al actualizar votante`, err.message);
    next(err);
  }
});



//--------------------------------DELETE----------------------------------

//DELETE DIGITADORES
router.delete('/digitadores/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.deleteDigitador(req.params.cedula));
  } catch (err) {
    console.error(`Error al obtener digitador`, err.message);
    next(err);
  }
});

//DELETE CALLCENTER
router.delete('/callcenter/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.deleteCallcenter(req.params.cedula));
  } catch (err) {
    console.error(`Error al obtener callcenter`, err.message);
    next(err);
  }
});


//DELETE LIDER
router.delete('/lideres/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.deleteLider(req.params.cedula));
  } catch (err) {
    console.error(`Error al obtener lider`, err.message);
    next(err);
  }
});


//DELETE VOTANTE
router.delete('/votantes/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.deleteVotante(req.params.cedula));
  } catch (err) {
    console.error(`Error al obtener votante`, err.message);
    next(err);
  }
});





///NUEVO CODIGO---------------------------------------------------------
// Ruta para obtener múltiples digitadores con paginación
router.get('/', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      res.json(await digitadores.getMultiple(page));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Ruta para obtener un digitador por Cedula
  router.get('/:cedula', async (req, res) => {
    try {
      res.json(await digitadores.getById(req.params.cedula));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Ruta para crear un nuevo digitador
  router.post('/', async (req, res) => {
    try {
      res.json(await digitadores.create(req.body));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Ruta para actualizar un digitador
  router.put('/:cedula', async (req, res) => {
    try {
      res.json(await digitadores.update(req.params.cedula, req.body));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Ruta para eliminar un digitador
  router.delete('/:cedula', async (req, res) => {
    try {
      res.json(await digitadores.remove(req.params.cedula));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



  
module.exports = router;
