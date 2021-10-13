var express = require('express');
var router = express.Router();
var cookie = require('cookie-parser'); //cookie中间件
var session = require('express-session'); //session中间件
var db = require('./dataBase');

router.get('/admin', function(req, res) {
    res.render('information_admin');
})

router.get('/user', function(req, res) {
    if (req.session.username == null) res.redirect('/login/user_login');
    else if (req.session.priority == 'admin') res.redirect('/information/admin');
    else db.Search('userdata', 'Name', req.session.username, function(err, data) {
        if (err) res.send(err.message);
        else res.render('information_user', { User: data[0] });
    });

})

module.exports = router;