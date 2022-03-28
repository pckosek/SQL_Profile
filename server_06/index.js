var express = require('express');
var app = express();
var mysql = require('mysql');

var bodyParser  = require('body-parser')

var hbs = require('hbs')
app.set('view engine', 'hbs');

// -------------- body-parser initialization -------------- //
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// -------------- mysql initialization -------------- //
// USE PARAMETERS FROM DIRECTOR DOCS!!!
var sql_params = {
  connectionLimit : 10,
  user            : process.env.DIRECTOR_DATABASE_USERNAME,
  password        : process.env.DIRECTOR_DATABASE_PASSWORD,
  host            : process.env.DIRECTOR_DATABASE_HOST,
  port            : process.env.DIRECTOR_DATABASE_PORT,
  database        : process.env.DIRECTOR_DATABASE_NAME
}

app.locals.pool  = mysql.createPool(sql_params);


// -------------- express 'get' handlers -------------- //





// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
