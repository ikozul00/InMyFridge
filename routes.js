var express = require('express');
var fs = require('fs');
const controllers=require('./controllers');
const controllersRegistration = require('./controllerRegistration');
const app = require('./index');
var router = express.Router();
var path = require("path");


router.get('/', controllers.readData);
router.get('/change', controllers.changeData);

//Registracija
router.post('/registration', controllersRegistration.SignUp);
router.get('/failedSignUp',function(request,response){
    response.sendFile(path.join(__dirname+'/src/signUpError.html'));
});

module.exports = router;