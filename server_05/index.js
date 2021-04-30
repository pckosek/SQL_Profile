var express = require('express');
var app = express();
var mysql = require('mysql');

var bodyParser  = require('body-parser')
var cookieSession = require('cookie-session')

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

var pool  = mysql.createPool(sql_params);


// -------------- cookie initialization -------------- //

app.use(cookieSession({
  name: 'chocolate_chip',
  keys: ['SomeSecretKeys123', 'ThatYouShouldChange456']
}))


// -------------- express 'get' handlers -------------- //


app.get('/', function(req,res){
    res.render('sql_navigation')
})

app.get('/profile_form', function(req, res){
    res.render('profile_form')
});

app.post('/update_profile', function(req, res){
    
    
    var user_no = parseInt(req.body.profile_id);
    if (isNaN(user_no)) {
        res.send('ERROR - Please enter a numeric ID :)');
        return;
    } 
    
    var nickname = req.body.nickname;

    // just for fun, retain the user's id number in the session
    req.session.user_id = user_no;


    // UPSERT COMMAND 
    // THE RIGHT WAY
    var sql = 'INSERT INTO profile(id, nickname) VALUES (?,?) ON DUPLICATE KEY UPDATE nickname = VALUES(nickname);'

    var params_array = [user_no, nickname];

    pool.query(sql, params_array, function(error, results, fields){
        if (error) throw error;
        res.redirect('https://user.tjhsst.edu/pckosek/profile')
    })    
});


app.get('/profile', function(req, res){
    
    var user_no = req.session.user_id || 0;
    // the above statement means "the user_id key stored in the cookie OR (because the id is undefined) 0"
    
    var q = 'SELECT nickname from profile WHERE id=?';
    var params_array = [user_no];
        
    pool.query(q, params_array,  function (error, results, fields) {
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
