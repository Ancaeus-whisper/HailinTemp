var express = require('express');
var router = express.Router();
var session=require('express-session');//session中间件
var fs = require('fs');      //文件解析
var path = require('path');  //系统路径
var db=require('./dataBase');
var vcode=require('./vcode');
var index;

var numberTest= /[0-9]/;

var alphaTest=/[a-z]/i;

router.get('/register_confirm',function(req,res)
{
    if(numberTest.test(req.query.password)&&alphaTest.test(req.query.password)){}
    else
    {
        res.send(400,{"error":"密码必须要包含数字和字母"});
            return;
    }
    db.Search("userdata","Name","*",function(err,data)
    {
        var isSame=false;
        data.forEach(function(value)
    {
        if(value.Name==req.query.name.toString()||value.IdCard==req.query.identity.toString()||req.query.phone.toString()==value.Telephone)
        {
            res.send(400,{"error":"信息重复"});
            isSame=true;
        }       
    }); 
    if(!isSame)
    {
        db.InsertUserData(index,req.query.name,"","",req.query.identity,req.query.phone,req.query.password,function(err,result)
        {
            if(err) res.send(400,err.message);
            else res.send(200,"注册成功");
        });
    
    }
    })
});

router.get('/',function(req,res)
{
    var user;
    var length=0;
    db.Search("userdata","Name",'*',function(err,data)
    {
       user=data;      
        user.forEach(function(value)
        {
           length++;
        })
        index=length+1;
    });

    if(req.session.username){res.send('AccessDenied');} 
    else res.render('regist');
});

module.exports = router;