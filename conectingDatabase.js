var pg=require('pg');

var conString="postgres://xodzpkpf:POzKRU1cSZALG1T2bl_0SUAzeOLUk_N6@kandula.db.elephantsql.com:5432/xodzpkpf";

var client=new pg.Client(conString);
client.connect(function(err){
    if(err){
        return console.error('could not connect to postgres',err);
    }
    client.query('SELECT NOW() AS "theTime" ',function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        console.log(result.rows[0].theTime);
    });
});

module.exports = client;