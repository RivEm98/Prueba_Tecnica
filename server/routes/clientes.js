var express = require('express');
var router = express.Router();
const controllers = require('../controllers/clientes')

/* GET home page. */
router.get('/', controllers.listar);


module.exports = router;
