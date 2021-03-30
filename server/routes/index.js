var express = require('express');
var router = express.Router();
const controllers = require('../controllers/index')

/* GET home page. */
router.get('/', controllers.index);


module.exports = router;
