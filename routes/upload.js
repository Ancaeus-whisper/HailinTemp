var express = require('express');
var router = express.Router();
var cookie=require('cookie-parser'); //cookie中间件
var session=require('express-session');//session中间件
var db=require('./dataBase');

router.get('/revers_send',function(req,res)
{
    db.InsertEQMData('/1.png',req.query.Name,req.query.Mentor,req.query.Experiment,req.query.Equipment
    ,req.query.Remark,req.query.NormalPrice,req.query.VIPPrice,
    function(err,data)
    {
        if(err) res.send(400,err.message);
        else res.redirect('/');
    });
});

router.get('/video_send',function(req,res)
{
    db.InsertVideoData('',req.query.Title,req.query.URL,function(err,data)
    {
        if(err) res.send(400,err.message);
        else res.redirect('/');
    });
});

router.get('/revers',function(req,res)
{
    res.render('uploadrev');
});

router.get('/video',function(req,res)
{
    res.render('upload');
});


router.get('/',function(req,res)
{
    res.render('upload');
})

module.exports = router;