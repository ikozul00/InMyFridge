const fs=require("fs");
const client = require('../conectingDatabase');
var session = require('express-session');


//log in user
exports.loginUser=function(request,response){
    var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		client.query('SELECT * FROM korisnik WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/');
			} else {
                resonse.render('signIn.ejs',{username: username,message:'Incorrect Username and/or Password!'});
			}			
			response.end();
		});
	}
    else {
        response.render('signIn.ejs',{message:'Please enter Username and Password!'});
		response.end();
	}
};