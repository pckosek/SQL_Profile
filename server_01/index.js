var express = require('express');
var app = express();
var mysql = require('mysql');

var hbs = require('hbs')


app.set('view engine', 'hbs');



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

var pool  = mysql.createPool(sql_params);


// -------------- express 'get' handlers -------------- //


app.get('/', function(req,res){
    res.render('sql_navigation')
})


app.get('/profile_form', function(req, res){
    res.render('profile_form')
});

app.get('/update_profile', function(req, res){
    
    // UPSERT COMMAND    
    var sql = 'INSERT INTO profile(id, nickname ) VALUES (0, "bob") ON DUPLICATE KEY UPDATE nickname = VALUES(nickname);'
    
    pool.query(sql, function(error, results, fields){
        if (error) throw error;
        res.redirect('https://user.tjhsst.edu/pckosek/profile')
    })    
    
});


app.get('/profile', function(req, res){
    
    var q = 'SELECT nickname from profile WHERE id=0';
    
    pool.query(q,  function (error, results, fields) {
        if (error) throw error;
        
        var nickname = results[0]['nickname'];
        
        res.render('profile',{'nickname':nickname})
    });
    
});


// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});