// var http = require('http');
// const client = require('./conectingDatabase');
// var fs=require('fs');
// let handleRequest=(request, response)=>{
//   response.writeHead(200, { 'Content-Type': 'text/html'});
//   fs.readFile('./index.html', null, function (error, data) {
//     if (error) {
//         response.writeHead(404);
//         respone.write('Whoops! File not found!');
//     } else {
//         response.write(data);
//     }
//     response.end();
// });
// };
// var app=http.createServer(handleRequest);
// app.listen(8800);


// var sql="SELECT * FROM korisnik";
// client.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });

var express=require('express');
var app = express();
var routes=require('./routes');


var server = app.listen(8080, function () {
    var host = "localhost";
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
 });

 app.use('/', routes);

