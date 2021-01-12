var express=require('express');
var app = express();
var routes=require('./routes');
var serveStatic = require('serve-static');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
const client = require('./conectingDatabase');

app.use(express.urlencoded({
    extended: true
  }))

var server = app.listen(8080, function () {
    var host = "localhost";
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
 });


 app.set('views', 'src');
 app.set('view engine', 'ejs');

 app.use(express.static(path.join(__dirname, 'src/')));
 app.use('/', routes);
 app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });

  app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

