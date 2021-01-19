var express = require('express');
var fs=require("fs");
var path=require("path");
const controllers=require('./controllers/controllers');
const controllersLogin=require('./controllers/loginControler');
const controllersProfile=require('./controllers/profileControler');
const controllersRegistration = require('./controllers/controllerRegistration');
const controllersRecipeSearch = require('./controllers/recipeSearchController.js');
const app=require("./index");
var router = express.Router();
var user=require("./models");
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

//Registracija
router.post('/registration', controllersRegistration.SignUp);
router.get('/failedSignUp',function(request,response){
    response.sendFile(path.join(__dirname+'/src/signUpError.html'));
});

router.get('/myProfile',controllersProfile.getProfile);
router.get('/logOut',function(request,response){
    user.username="";
    user.loged=false;
    user.password="";
    response.status(200);
});

router.post('/removeFavourites',controllersProfile.removeFavourites);
router.post('/addFavourites',controllersProfile.addFavourites);
router.post('/removeRecipe',controllersProfile.removeRecipe);

//Pretraga
router.post('/searchByAuthor',controllersRecipeSearch.searchByAuthor);
router.post('/searchByRecipe',controllersRecipeSearch.searchByRecipe);
router.post('/searchByTags',controllersRecipeSearch.searchByTags);
router.post('/searchByTagsAndTime',controllersRecipeSearch.searchByTagsAndTime);
router.post('/searchByIngredients',controllersRecipeSearch.searchByIngredients)

module.exports = router;