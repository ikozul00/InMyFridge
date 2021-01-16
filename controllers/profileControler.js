const client = require("../conectingDatabase");
var user=require("../models");


exports.getProfile=function(request,response){
    var sql1=`SELECT id_korisnik,ime,prezime,username,email FROM korisnik WHERE username='${user.username}' AND lozinka='${user.password}' `;
    client.query(sql1,function(err,result){
        if(err) throw err;
        var row=result.rows[0];
        var sql2=`SELECT naziv FROM recept WHERE id_korisnik='${row.id_korisnik}' `;
        var recepti=[];
        var omiljeni=[];
        client.query(sql2,function(err,result2){
            if(err) throw err;
            var recepti=[];
            for(let i=0;i<result2.rows.length;i++){
                recepti[i]=result2.rows[i].naziv;
            }
        var sql3=`SELECT recept.naziv FROM recept INNER JOIN favoriti on recept.id_recepta=favoriti.id_recept INNER JOIN korisnik on korisnik.id_korisnik=favoriti.id_korisnik
        WHERE korisnik.username='${user.username}' `;
        var omiljeni=[];
        client.query(sql3,function(err,result3){
            if(err) throw err;
            for(let i=0;i<result3.rows.length;i++){
                omiljeni[i]=result3.rows[i].naziv;
            }
            response.status(200).json({"ime":row.ime,"prezime":row.prezime,"email":row.email,"username":row.username,"recepti":recepti,"omiljeni":omiljeni});

        })
        })
    })
}


exports.addFavourites=function addFavourites(request,response){
    var naziv=request.body.naziv;
    var sql1=`SELECT id_recepta FROM recept WHERE naziv='${naziv}' `;
    var sql2=`SELECT id_korisnik FROM korisnik WHERE username='${user.username}' AND password='${user.password}' `;
    client.query(sql1,function(err,res){
        if(err) throw err;
        client.query(sql2,function(err,res2){
            if(err) throw err;
            var currentTime=new Date();
            sql3=`INSERT INTO favoriti(id_korisnik,id_recept,time_stamp) VALUES ('${res.rows[0].id_recepta}','${res2.rows[0].id_korisnika}',${currentTime})' `;
            client.query(sql3,function(err,res3){
                if(err) throw err;
                response.status(200);
            })
        })
    })
}


exports.removeFavourites=function removeFavourites(request,response){
    var naziv=request.body.name;
    var sql1=`DELETE FROM favoriti WHERE id_korisnik=(SELECT id_korisnik FROM korisnik WHERE username='${user.username}') AND id_recept=(SELECT id_recepta FROM recept WHERE naziv='${naziv}')
    RETURNING * `;
    client.query(sql1,function(err,res){
        if(err) throw err;
            response.status(200).json({"message":"found"});
    })
}

exports.removeRecipe=function removeRecipe(request,response){
    var naziv=request.body.name;
    var sql=`DELETE FROM recept WHERE naziv='${naziv}' AND id_korisnik=(SELECT id_korisnik FROM korisnik WHERE username='${user.username}') `;
    client.query(sql,function(err,res){
        if(err) throw err;
            response.status(200).json({"message":"found"});
    })
}