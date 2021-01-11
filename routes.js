var express = require('express');
var fs=require("fs");
const controllers=require('./controllers/controllers');
const controllersLogIn=require('./controllers/loginControler');
const app=require("./index");
var router = express.Router();


router.get('/', controllers.readData);
router.get('/change', controllers.changeData);

//login
router.post('/login',controllersLogIn.loginUser);
// router.get('/login/failed',controllersLogIn.wrongData);
 


module.exports = router;