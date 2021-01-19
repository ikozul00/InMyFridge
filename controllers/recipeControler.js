const client = require("../conectingDatabase");
const recipe=require("../modelsRecept");
const user=require("../models");
exports.getRecipe=function (request,response){
    var sql1=`SELECT id_recepta,naziv,tekst_recepta,username FROM recept INNER JOIN korisnik ON korisnik.id_korisnik=recept.id_korisnik WHERE naziv='${recipe.naziv}' `;
    client.query(sql1,function(err,result){
        if(err) throw err;
        let row=result.rows[0];
        var sql2=`SELECT sastojak.naziv,kolicina,jedinica FROM recept_sastojak INNER JOIN sastojak ON sastojak.id_sastojak=recept_sastojak.id_sastojak WHERE id_recept='${row.id_recepta}' `;
        client.query(sql2,function(err,result2){
            if(err) throw err;
            let sastojci=[];
            let kolicina=[];
            let jedinica=[];
            for(let i=0;i<result2.rows.length;i++){
                sastojci[i]=result2.rows[i].naziv;
                kolicina[i]=result2.rows[i].kolicina;
                jedinica[i]=result2.rows[i].jedinica;
            }
            var sql3=`SELECT naziv FROM tag INNER JOIN recept_tag ON tag.id_taga=recept_tag.id_tag WHERE id_recept='${row.id_recepta}' `;
            client.query(sql3,function(err,result3){
                if(err) throw err;
                let tagovi=[];
                for(let i=0;i<result3.rows.length;i++){
                    tagovi[i]=result3.rows[i].naziv;
                }
                var prijavljen=false;
                var favorit=false;
                if(user.username!=" "){
                    prijavljen=true;
                    var sql4=`SELECT * FROM favoriti WHERE id_recept='${row.id_recepta}' AND id_korisnik=(SELECT id_korisnik FROM korisnik WHERE username='${user.username}' AND lozinka='${user.password}') `;
                    client.query(sql4,function(err,result4){
                        if(err) throw err;
                        if(typeof (result4.rows[0])==="undefined"){
                            favorit=false;
                        }
                        else{
                            favorit=true;
                        }
                        response.status(200).json({"naziv":row.naziv,"sadrzaj":row.tekst_recepta,"autor":row.username,"sastojci":sastojci,"kolicina":kolicina,"jedinica":jedinica,"tagovi":tagovi,"prijavljen":prijavljen,"favorit":favorit});
                    });
                }
                else{
                    prijavljen=false;
                    favorit=false;
                    response.status(200).json({"naziv":row.naziv,"sadrzaj":row.tekst_recepta,"autor":row.username,"sastojci":sastojci,"kolicina":kolicina,"jedinica":jedinica,"tagovi":tagovi,"prijavljen":prijavljen,"favorit":favorit});
                }
            });
        });
    });
}


exports.nameRecipe=function(request,response){
    recipe.naziv=request.body.name;
}