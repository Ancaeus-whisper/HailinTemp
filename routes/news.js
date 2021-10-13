var express = require('express');
var router = express.Router();
var cookie=require('cookie-parser'); //cookie中间件
var session=require('express-session');//session中间件
var db=require('./dataBase');



router.get('/course',function(req,res)
{
   db.Search('videodata','Title','*',function(err,result)
   {
       if(err) res.send(err.message);
       else res.render('direct_video',{isLogin:req.session.username!=null,username:req.session.username,isAdmin:req.session.priority=='admin',Video:result});
   });
})


router.get('/notice',function(req,res)
{
    res.render('notice',{isLogin:req.session.username!=null,username:req.session.username});
})

router.get('/newsdetail',function(req,res)
{
    res.send('news/newsdetail');
})

router.get('/videosdetail',function(req,res)
{
    res.send('news/videosdetail');
})

router.get('/',function(req,res)
{
 res.render('news.ejs',{isLogin:req.session.username!=null,username:req.session.username,isAdmin:req.session.priority=='admin'});
})

module.exports = router;