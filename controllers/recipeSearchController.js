const client = require("../conectingDatabase");
var user = require("../models");

exports.searchByAuthor = function (request, response) {

    var username = request.body.username;
    var sqlRecipes = `SELECT recept.naziv FROM recept INNER JOIN korisnik on recept.id_korisnik=korisnik.id_korisnik WHERE korisnik.username='${username}' `;

    client.query(sqlRecipes, function (err, result) {
        if (err) throw err;

        var recepti = [];
        for (let i = 0; i < result.rows.length; i++) {
            recepti.push(result.rows[i]);
        }

        response.contentType('application/json');
        response.send(JSON.stringify(recepti));
        response.end();
    });

}

exports.searchByRecipe = function (request, response) {

    var name = request.body.name;
    var sqlRecipes = `SELECT naziv FROM recept WHERE naziv LIKE '%${name}%'`;

    client.query(sqlRecipes, function (err, result) {
        if (err) throw err;

        var recepti = [];
        for (let i = 0; i < result.rows.length; i++) {
            recepti.push(result.rows[i]);
        }

        response.contentType('application/json');
        response.send(JSON.stringify(recepti));
        response.end();
    });

}

exports.searchByTags = function (request, response) {

    var tag0 = request.body.tag0;
    var tag1 = request.body.tag1;
    var tag2 = request.body.tag2;
    var tag3 = request.body.tag3;
    var tag4 = request.body.tag4;

    var querySegment = `tag.naziv = '${tag0}' OR tag.naziv = '${tag1}' OR tag.naziv = '${tag2}' OR tag.naziv = '${tag3}' OR tag.naziv = '${tag4}' `;

    var sqlRecipes = `SELECT DISTINCT recept.naziv FROM recept INNER JOIN recept_tag ON recept_tag.id_recept=recept.id_recepta INNER JOIN tag ON tag.id_taga=recept_tag.id_tag WHERE ` + querySegment;

    client.query(sqlRecipes, function (err, result) {
        if (err) throw err;

        var recepti = [];
        for (let i = 0; i < result.rows.length; i++) {
            recepti.push(result.rows[i]);
        }

        response.contentType('application/json');
        response.send(JSON.stringify(recepti));
        response.end();
    });

}

exports.searchByTagsAndTime = function (request, response) {

    var tag0 = request.body.tag0;
    var tag1 = request.body.tag1;
    var tag2 = request.body.tag2;
    var tag3 = request.body.tag3;
    var tag4 = request.body.tag4;
    var timeTag = request.body.timeTag;
    var sqlRecipes="";

    var querySegment = `(tag.naziv = '${tag0}' OR tag.naziv = '${tag1}' OR tag.naziv = '${tag2}' OR tag.naziv = '${tag3}' OR tag.naziv = '${tag4}' )`;

    if(tag0=="empty" && tag1=="empty" && tag2=="empty" && tag3=="empty" && tag4=="empty" ){ //Znači selectano je samo vrijeme i nikoji drugi tag
        sqlRecipes = `SELECT DISTINCT recept.naziv FROM recept INNER JOIN recept_tag ON recept_tag.id_recept=recept.id_recepta INNER JOIN tag ON tag.id_taga=recept_tag.id_tag WHERE recept.id_recepta IN (SELECT recept.id_recepta FROM recept INNER JOIN vrijeme ON vrijeme.id_vremena = recept.id_vrijeme WHERE vrijeme.vrijeme='${timeTag}')`;
    }
    else{
        sqlRecipes = `SELECT DISTINCT recept.naziv FROM recept INNER JOIN recept_tag ON recept_tag.id_recept=recept.id_recepta INNER JOIN tag ON tag.id_taga=recept_tag.id_tag WHERE recept.id_recepta IN (SELECT recept.id_recepta FROM recept INNER JOIN vrijeme ON vrijeme.id_vremena = recept.id_vrijeme WHERE vrijeme.vrijeme='${timeTag}') AND` + querySegment;
    }
    
    client.query(sqlRecipes, function (err, result) {
        if (err) throw err;

        var recepti = [];
        for (let i = 0; i < result.rows.length; i++) {
            recepti.push(result.rows[i]);
        }

        response.contentType('application/json');
        response.send(JSON.stringify(recepti));
        response.end();
    });

}