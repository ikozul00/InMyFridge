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
