const fs=require("fs");
const client = require('../conectingDatabase');


//log in user
// exports.loginUser=function(request,response){
//     var username = request.body.username;
// 	var password = request.body.password;
// 	if (username && password) {
// 		client.query('SELECT * FROM korisnik WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
// 			if (results.length > 0) {
// 				request.session.loggedin = true;
// 				request.session.username = username;
// 				response.redirect('/');
// 			} else {
//                 resonse.render('signIn.ejs',{username: username,message:'Incorrect Username and/or Password!'});
// 			}			
// 			response.end();
// 		});
// 	}
//     else {
//         response.render('signIn.ejs',{message:'Please enter Username and Password!'});
// 		response.end();
// 	}
// };

//ode doeđu podaci sa forme
exports.loginUser=function(request,response){
    var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		client.query(`SELECT username FROM korisnik WHERE username = '${username}' AND lozinka = '${password}' `,  function(err, result) {
			if (err) throw err;
			if (typeof (result.rows[0]) !== "undefined") {
				response.status(200).json({message:"Authentication successful"});
			} 
			else {
                response.status(404).json({message:"Authentication failed"});
			}			
			response.end();
		});
	}
	else{
		response.status(404).json({message:"Authentication failed"});
		response.end();
	}
};