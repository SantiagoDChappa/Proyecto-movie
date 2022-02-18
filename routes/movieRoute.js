var express = require('express');
var router = express.Router();
const movieController = require('../controllers/movieController');
const adminController = require('../middlewares/adminMiddlewares');


/* GET home page. */
router.get('/', movieController.home);

//Crear pelicula
router.get('/movies/create', adminController, movieController.create)
router.post('/movies/create', movieController.createSend)

//Editar pelicula
router.get('/movies/edit/:id', adminController, movieController.update)
router.post('/movies/edit/:id', movieController.updateSend)

//Eliminar pelicula
router.post('/movies/:id/delete', adminController,movieController.delete)

//Detalle de pelicula
router.get('/movies/:id', movieController.detail)

module.exports = router;
