const express = require('express');
var router = express.Router();


router.get('/profile', function(req, res) { 

    var sqlQuery = 'SELECT nickname FROM profile WHERE id=1'
    
    res.app.locals.pool.query(sqlQuery, function(error, results, fields){
        if (error) throw error;

		var nickname = results[0].nickname;
		var render_params = {
			'nickname' : nickname
		}
        res.render('profile', render_params)
    })  
});

module.exports = router;