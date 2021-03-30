var express = require('express');
var router = express.Router();
const controllers = require('../controllers/alquileres')

/* CREATE */
router.post('/', controllers.agregar)
/* READ */
router.get('/', controllers.listar);
/* detalle de una reserva */
router.get('/:id', controllers.detalle)
/* UPDATE */
router.put('/:id', controllers.actualizar)
/* DELETE */
router.delete('/:id', controllers.eliminar)


module.exports = router;
