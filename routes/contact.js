var express = require('express');
var router = express.Router();
var cookie=require('cookie-parser'); //cookie中间件
var session=require('express-session');//session中间件
var db=require('./dataBase');

router.get('/',function(req,res)
{
    if(req.session.username) res.render('contact_us',{isLogin:true,username:req.session.username});
    else res.render('contact_us',{isLogin:false});
});

module.exports = router;