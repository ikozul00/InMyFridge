var express = require('express');
var fs = require('fs');
const controllers=require('./controllers');
const controllersRegistration = require('./controllerRegistration');
const app = require('./index');
var router = express.Router();


router.get('/', controllers.readData);
router.get('/change', controllers.changeData);

router.post('/registration', controllersRegistration.SignUp);

module.exports = router;