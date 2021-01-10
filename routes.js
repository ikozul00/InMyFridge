var express = require('express');
const controllers=require('./controllers');
var router = express.Router();


router.get('/', controllers.readData);
router.get('/change', controllers.changeData);


module.exports = router;