const fs=require("fs");
const client = require('../conectingDatabase');
const app=require("../index");


 exports.readData = function(request, response) {
     // response.writeHead(200, { 'Content-Type': 'text/html'});
     // fs.readFile('./src/testiranje.html', null, function (error, data) {
     //     if (error) {
     //         response.writeHead(404);
     //          respone.write('Whoops! File not found!');
     //     } 
     //     else {
     //         response.write(data);
     //     }
     //     response.end();
     // });
     response.sendFile(__dirname+'/src/index.html');
 }


//read information from database
exports.changeData=function(request,response){
    var sql1="SELECT ime,prezime,email,username FROM korisnik";
    client.query(sql1, function (err, result) {
             if (err) throw err;
             var rows=result.rows;
                var row = rows[0];
             response.json({"ime":row.ime,"prezime":row.prezime,"email":row.email,"username":row.username});
    });


    
}
