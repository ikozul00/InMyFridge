const fs=require("fs");
const client = require('../conectingDatabase');


//log in user
exports.logInUser=function(request,response){
    var sql="SELECT lozinka FROM korisnik WHERE username=ana";
    client.query(sql,function(err,result){
        var row=result.rows[0];
        if(row[0]=="undefined"){
            response.status(400).json({message:"Wrong username or password"});
        }
        if(err) throw err;
        // var row=result.rows[0];
        // if(row[0]==="undefined"){
        //     response.status(400).json({message:"Wrong username or password"});
        // }
        else{
            response.status(200).json({message:"Authentication successful","username":username});
        }
    });
}
