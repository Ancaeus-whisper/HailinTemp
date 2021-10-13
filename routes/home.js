var express = require('express');
var router = express.Router();
var cookie=require('cookie-parser'); //cookie中间件
var session=require('express-session');//session中间件
var db=require('./dataBase');

router.get('/',function(req,res)
{
   res.render('index',{isLogin:req.session.username!=null,username:req.session.username});
})

module.exports = router;