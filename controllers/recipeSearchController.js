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
    var sqlRecipes=`SELECT naziv FROM recept WHERE naziv LIKE '%${name}%'`;

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

exports.searchByTags=function(request,response){
   
    var tag0 = request.body.tag0;
    var tag1 = request.body.tag1;
    var tag2 = request.body.tag2;
    var tag3 = request.body.tag3;
    var tag4 = request.body.tag4;
    
    var querySegment=`tag.naziv = '${tag0}' OR tag.naziv = '${tag1}' OR tag.naziv = '${tag2}' OR tag.naziv = '${tag3}' OR tag.naziv = '${tag4}' `;
    
    var sqlRecipes=`SELECT DISTINCT recept.naziv FROM recept INNER JOIN recept_tag ON recept_tag.id_recept=recept.id_recepta INNER JOIN tag ON tag.id_taga=recept_tag.id_tag WHERE ` + querySegment;

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