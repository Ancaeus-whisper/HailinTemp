var express = require('express');
var router = express.Router();
var session = require('express-session'); //session中间件
var fs = require('fs'); //文件解析
var path = require('path'); //系统路径
var db = require('./dataBase');

var BookRecord={};

router.get('/book/book_confirm', function(req, res) {
    var username=req.session.username;
    if(req.session.username==null) res.redirect('/revers');
    else if(BookRecord[username]==null) res.redirect('/revers');
    else db.InsertRecordData('',BookRecord[username],username,req.query.StartTime,req.query.EndTime,0,function(err,data)
    {
        if(err) res.send(400,err.message);
        else res.send(200,"预约成功");
    });

});

router.get('/book', function(req, res) {

    if(req.session.username==null||req.query.Name==null) res.redirect('/revers');
    else
    {
        var username=req.session.username;
        BookRecord.username=req.query.Name;
        res.render('reservation_information.ejs',{Reverse:req.query.Name});
    }
    
});

router.get('/', function(req, res) {
    db.Search('eqmdata', 'Name', '*', function(err, result) {
        if (err) res.send(err.message);
        else res.render('revers', { isLogin: req.session.username != null, username: req.session.username, Experiment: result });

    });

});

module.exports = router;