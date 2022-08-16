const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getByName } = require('./control/getByName');
const { getIdGame } = require('./control/getIdGame');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', getByName)
router.get('/videogames/:id', getIdGame)


module.exports = router;
