var express = require('express');
const controllers=require('./controllers/controllers');
const controllersLogIn=require('./controllers/loginControler');
const app=require("./index");
var router = express.Router();


router.get('/', controllers.readData);
router.get('/change', controllers.changeData);

//login
router.post('/login',controllersLogIn.loginUser);
 


module.exports = router;