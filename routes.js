var express = require('express');
var fs=require("fs");
var path=require("path");
const controllers=require('./controllers/controllers');
const controllersLogin=require('./controllers/loginControler');
const controllersProfile=require('./controllers/profileControler');
const app=require("./index");
var router = express.Router();
router.get('/', controllers.readData);
router.get('/change', controllers.changeData);

//login
router.post('/login',controllersLogin.loginUser);

router.get('/failedLogin',function(request,response){
    response.sendFile(path.join(__dirname+'/src/signInFailed.html'));
});

router.get('/successful',function(request,response){
    response.sendFile(path.join(__dirname+'/src/indexSignedIn.html'));
});

router.get('/myProfile',controllersProfile.getProfile)

module.exports = router;