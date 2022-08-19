const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getByName } = require('./control/getByName');
const { getIdGame } = require('./control/getIdGame');
const { getGenres } = require('./control/getGenres')
const { postGame } = require('./control/postGame')
const { getPlatforms } = require('./control/getPlatforms')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', getByName)
router.get('/videogames/:id', getIdGame)
router.get('/genres', getGenres)
router.post('/videogames', postGame)
router.get('/platforms', getPlatforms)


module.exports = router;
