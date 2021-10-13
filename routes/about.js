var express = require('express');
var router = express.Router();
var cookie = require('cookie-parser'); //cookie中间件
var session = require('express-session'); //session中间件
var db = require('./dataBase');

router.get('/aboutus', function(req, res) {
    res.render('about_us');

});

router.get('/structure', function(req, res) {
    res.send('about/structure');

});

router.get('/team', function(req, res) {
    res.send('about/team');

});

router.get('/', function(req, res) {
    if (req.session.username) res.render('about', { isLogin: true, username: req.session.username });
    else res.render('about', { isLogin: false });
})

module.exports = router;