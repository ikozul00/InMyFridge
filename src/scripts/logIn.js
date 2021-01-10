
exports.signInFunction=function (username,password){
    console.log("evo");
    var sql="SELECT lozinka FROM korisnik WHERE username=ana";
    var response="";
    client.query(sql,function(err,result){
        if(err) throw err;
        var response="";
        var row=result.rows[0];
        if(row[0]=="undefined"){
            response="Wrong password or username";
        }
        else{
            response="Authentication successful";
        }  
    });   
    return response;  
}