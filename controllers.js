const fs=require("fs");
const client = require('./conectingDatabase');
const script=require("./functions.js");
exports.readData = function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
             respone.write('Whoops! File not found!');
        } 
        else {
            response.write(data);
        }
        response.end();
    });
}

exports.changeData=function(request,response){
    var sql1="SELECT ime FROM korisnik";
    client.query(sql1, function (err, result) {
             if (err) throw err;
             response.json(result.rows);
    });


    
}
