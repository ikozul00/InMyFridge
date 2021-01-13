  
const fs=require("fs");
const client = require('./conectingDatabase');
//const funkcije=require("./registration.js");

exports.SignUp=function(request,response){

  var username = request.body.username;
    var password = request.body.psw;
    var surname = request.body.surname;
    var name = request.body.name;
	var email = request.body.email;

	var sqlQuery = `INSERT INTO korisnik (ime, prezime, username, email, lozinka) VALUES ('${name}', '${surname}', '${username}', '${email}', '${password}')`;

	if (name && surname && email && username && password) {
		client.query(sqlQuery, function (err, result) {

				if (err)
					throw err;

				response.redirect("/");
		
			});
	}
	else{
		response.status(404).json({message:'Please enter your infromation!'});
		response.end();
	}
};