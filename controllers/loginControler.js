const fs=require("fs");
const path=require("path");
const client = require('../conectingDatabase');


//ode doeđu podaci sa forme
exports.loginUser=function(request,response){
    var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		client.query(`SELECT username FROM korisnik WHERE username = '${username}' AND lozinka = '${password}' `,  function(err, result) {
			if (err) throw err;
			if (typeof (result.rows[0]) !== "undefined") {
				response.redirect("/successful");
			}
			else {
				response.redirect("/failedLogin");
			}			
			response.end();
		});
	}
	else{
		response.redirect("/failedLogin");
		response.end();
	}
};