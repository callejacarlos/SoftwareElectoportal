const express = require('express');
const router = express.Router();
const administrador = require('../services/service_digitadores');


//-------------GET DE VOTANTES Y LIDEERES-----------------
//METODO DE MOSTRAR
//Get de todos los votantes
router.get('/votantes', async function(req, res, next) {
    try {
      res.json(await administrador.getVotantes(req.query.page));
    } catch (err) {
      console.error(`Error al obtener los datos `, err.message);
      next(err);
    }
  });

//Get de todos los lideres
router.get('/lideres', async function(req, res, next) {
    try { 
      res.json(await administrador.getLideres(req.query.page));
    } catch (err) {
      console.error(`Error al obtener los datos `, err.message);
      next(err);
    }
  });  
  


//-----------------POST DE VOTANTES Y LIDERES-----------------
//METODO INSERTAR

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





//------------------PUT DE VOTANTES Y LIDERES------------------
//METODO ACTUALIZAR

//UPDATE LIDERES
//Metodo PUT
router.put('/lideres/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.updateLideres(req.params.id, req.body));
  } catch (err) {
    console.error(`Error al actualizar lider`, err.message);
    next(err);
  }
});


//UPDATE VOTANTES
//Metodo PUT
router.put('/votantes/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.updateVotantes(req.params.id, req.body));
  } catch (err) {
    console.error(`Error al actualizar votante`, err.message);
    next(err);
  }
});






//-----------------DELETE DE VOTANTES Y LIDERES-----------------
//METODO ELIMINAR
//DELETE LIDER

router.delete('/lideres/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.deleteLider(req.params.id));
  } catch (err) {
    console.error(`Error al obtener lider`, err.message);
    next(err);
  }
});


//DELETE VOTANTE
router.delete('/votantes/:cedula', async function(req, res, next) {
  try {
    res.json(await administrador.deleteVotante(req.params.id));
  } catch (err) {
    console.error(`Error al obtener votante`, err.message);
    next(err);
  }
});




module.exports = router;


