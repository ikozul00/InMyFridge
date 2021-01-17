const client = require("../conectingDatabase");
var user=require("../models");

exports.searchByAuthor=function(request,response){
   
        var username = request.body.username;
        var sqlRecipes=`SELECT recept.naziv FROM recept INNER JOIN korisnik on recept.id_korisnik=korisnik.id_korisnik WHERE korisnik.username='${username}' `;
    
        client.query(sqlRecipes,function(err,result){
            if(err) throw err;

            var recepti=[];
            for(let i=0;i<result.rows.length;i++){
                recepti.push(result.rows[i]);
            }

            response.contentType('application/json');
            response.send(JSON.stringify(recepti));
            response.end();
        });
        
}

exports.searchByRecipe=function(request,response){
   
    var name = request.body.name;
    var sqlRecipes=`SELECT naziv FROM recept WHERE naziv LIKE '%${name}%' `;

    client.query(sqlRecipes,function(err,result){
        if(err) throw err;

        var recepti=[];
        for(let i=0;i<result.rows.length;i++){
            recepti.push(result.rows[i]);
        }

        response.contentType('application/json');
        response.send(JSON.stringify(recepti));
        response.end();
    });
    
}