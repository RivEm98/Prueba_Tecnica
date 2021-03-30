var express = require('express');
var router = express.Router();
const controllers = require('../controllers/oficinas')

/* GET home page. */
router.get('/', controllers.listar);
router.get('/:id', controllers.detalle);


module.exports = router;
