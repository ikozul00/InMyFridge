var express = require('express');
const controllers=require('./controllers/controllers');
const controllersLogIn=require('./controllers/logInControler');
var router = express.Router();


router.get('/', controllers.readData);
router.get('/change', controllers.changeData);
router.get('/signIn', (req, res) => {
    res.render('contact');
  });


module.exports = router;