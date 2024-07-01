const express = require('express');
const router = express.Router();
const administrador = require('../services/service_callcenter');

//Get de todos los votantes
router.get('/votantes', async function(req, res, next) {
    try {
      res.json(await administrador.getVotantes(req.query.page));
    } catch (err) {
      console.error(`Error al obtener los datos `, err.message);
      next(err);
    }
  });

//AGREGAR FUNCION GET BY ID
  
module.exports = router;  