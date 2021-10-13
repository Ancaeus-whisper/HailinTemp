var express = require('express');
var router = express.Router();
var cookie = require('cookie-parser'); //cookie中间件
var session = require('express-session'); //session中间件
var db = require('./dataBase');

var index = 0;

router.get('/send', (req, res) => {
    if (req.session.username == null) res.send(400, "登录失效");
    else {
        db.InsertFeedBacks(index, req.session.username, req.query.feedback, (err, data) => {
            if (err) res.send(400, err.massage);
            else res.redirect('/');
        });
    }
});

router.get('/', (req, res) => {

    if (req.session.username == null) res.redirect('/login/user_login');
    else if (req.session.priority == 'admin') res.redirect('/');
    var fb;
    var length = 0;
    db.Search("feedbacks", "Id", '*', function(err, data) {
        fb = data;
        fb.forEach(function() {
            length++;
        })
        index = length + 1;
    });
    res.render('feedback');
})

module.exports = router;