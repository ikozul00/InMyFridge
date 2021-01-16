  
const fs=require("fs");
const client = require('./conectingDatabase');

exports.SignUp=function(request,response){

    var username = request.body.username;
    var password = request.body.psw;
    var surname = request.body.surname;
    var name = request.body.name;
	var email = request.body.email;
	var passwordRepeat = request.body.pswRepeat;

	var sqlQuery = `INSERT INTO korisnik (ime, prezime, username, email, lozinka) VALUES ('${name}', '${surname}', '${username}', '${email}', '${password}')`;
	var checkIfExists = `SELECT * FROM korisnik WHERE username='${username}' OR email = '${email}'`;

	//provjeri je li lozinka oba puta dobro unesena
	if(password != passwordRepeat){
		response.redirect("/failedSignUp");
		response.end();
	}

	else if (name && surname && email && username && password) {

		//Provjeri postoji li vec takav user
		client.query(checkIfExists, function(err, result){
			if (err)
					throw err;
			if(typeof (result.rows[0]) !== "undefined"){
				response.redirect("/failedSignUp");
				response.end();
			}

			//Ako korisnik ne postoji u bazi, dodaj ga
			else{	
					client.query(sqlQuery, function (err, result) {

						if (err)
							throw err;

						response.redirect("/");
						response.end();
					});
			}
		});
	}

	else{
		response.redirect("/failedSignUp");
		response.end();
	}
};