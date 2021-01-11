var express = require('express');
const controllers=require('./controllers/controllers');
const controllersLogIn=require('./controllers/loginControler');
var router = express.Router();


router.get('/', controllers.readData);
router.get('/change', controllers.changeData);

//login
router.post('/login',controllersLogIn.loginUser);
router.get('/signIn.html',function (request,response){
    response.render('signIn.ejs',{message:" "});
});


module.exports = router;