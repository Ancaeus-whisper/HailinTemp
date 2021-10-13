var express = require('express');
var router = express.Router();
var cookie = require('cookie-parser'); //cookie中间件
var session = require('express-session'); //session中间件
var db = require('./dataBase');

router.get('/appointment_admin', function(req, res) {
    res.render('appointment_admin');
})

router.get('/', function(req, res) {
    if (req.session.username == null) res.redirect('/login/user_login');
    else if (req.session.priority == 'admin') res.redirect('/myself/appointment_admin');
    else db.Search('recorddata', 'Mentor', req.session.username, function(err, data) {
        if (err) res.send(err.message);
        else res.render('appointment_user', { Record: data });
    });

})

module.exports = router;